import { PrismaClient } from "@prisma/client";
import * as crypto from "node:crypto";

const prisma = new PrismaClient();

async function main() {
  console.log("초기 데이터 생성을 위해 기존 데이터를 삭제합니다...");
  // 역순으로 삭제하여 외래 키 제약 조건 준수
  await prisma.refreshToken.deleteMany();
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.userFragLink.deleteMany();
  await prisma.password.deleteMany();
  await prisma.frag.deleteMany();
  await prisma.user.deleteMany();

  console.log("1000명의 유저 생성 중...");
  const users = [];
  const passwordData = [];

  for (let i = 1; i <= 1000; i++) {
    const name = `user${i}`;
    const email = `user${i}@example.com`;
    const bio = `안녕하세요, ${name}입니다. 커뮤니티 활동이 즐거워요!`;

    users.push({
      id: crypto.randomUUID(),
      name,
      email,
      bio,
    });
  }

  // 일괄 생성 (성능 최적화)
  await prisma.user.createMany({
    data: users,
  });

  // 비밀번호 생성
  for (const user of users) {
    const salt = crypto.randomBytes(64).toString("base64");
    const digest = crypto
      .createHash("sha512")
      .update("password123!" + salt) // 모든 샘플 유저의 비밀번호는 password123!
      .digest("hex");

    passwordData.push({
      userId: user.id,
      salt,
      digest,
    });
  }

  await prisma.password.createMany({
    data: passwordData,
  });

  console.log("25개의 다양한 Frag(커뮤니티) 생성 중...");
  const fragNames = [
    "개발자 모임",
    "게임 뉴스",
    "요리 비법 공유",
    "운동 오운완",
    "일상 이야기",
    "독서 토론",
    "여행 정보",
    "최신 테크",
    "영화 리뷰",
    "반려동물",
    "음악 추천",
    "주식 투자",
    "부동산 지식",
    "자취 꿀팁",
    "코딩 테스트",
    "디자인 영감",
    "사진 작가",
    "자동차 매니아",
    "패션 트렌드",
    "어학 공부",
    "캠핑 마니아",
    "애니메이션",
    "보드게임",
    "정원 가꾸기",
    "명상과 쉼",
  ];

  const frags = [];
  for (let i = 0; i < fragNames.length; i++) {
    // 랜덤한 유저를 관리자로 지정
    const admin = users[Math.floor(Math.random() * users.length)];
    frags.push({
      id: crypto.randomUUID(),
      name: fragNames[i],
      description: `${fragNames[i]}를 사랑하는 사람들의 모임입니다. 함께 소통해요!`,
      adminId: admin.id,
    });
  }

  await prisma.frag.createMany({
    data: frags,
  });

  console.log("커뮤니티 가입 데이터 생성 중...");
  const memberships = [];
  for (const user of users) {
    // 각 유저는 1~8개의 Frag에 가입함
    const joinCount = Math.floor(Math.random() * 8) + 1;
    const shuffled = [...frags].sort(() => 0.5 - Math.random());
    const selectedFrags = shuffled.slice(0, joinCount);

    for (const frag of selectedFrags) {
      memberships.push({
        userId: user.id,
        fragId: frag.id,
        visitCount: Math.floor(Math.random() * 100),
      });
    }
  }

  await prisma.userFragLink.createMany({
    data: memberships,
  });

  console.log("3,000개의 게시글 생성 중...");
  const posts = [];
  for (let i = 0; i < 3000; i++) {
    const randomMembership =
      memberships[Math.floor(Math.random() * memberships.length)];
    const user = users.find((u) => u.id === randomMembership.userId)!;
    const frag = frags.find((f) => f.id === randomMembership.fragId)!;

    posts.push({
      id: crypto.randomUUID(),
      userId: user.id,
      fragId: frag.id,
      title: `${frag.name}에서의 ${i + 1}번째 게시글`,
      content: `이것은 ${frag.name}에 작성된 샘플 포스트 내용입니다. ${user.name}님이 작성하셨습니다. 활발한 커뮤니티 활동을 응원합니다!`,
      view: Math.floor(Math.random() * 1000),
    });
  }

  await prisma.post.createMany({
    data: posts,
  });

  console.log("댓글 및 좋아요 데이터 생성 중...");
  const comments = [];
  const likes = [];

  // 게시글마다 랜덤하게 댓글과 좋아요 생성
  for (const post of posts) {
    const commentCount = Math.floor(Math.random() * 10); // 포스트당 0~9개 댓글
    const likeCount = Math.floor(Math.random() * 20); // 포스트당 0~19개 좋아요

    for (let j = 0; j < commentCount; j++) {
      const commenter = users[Math.floor(Math.random() * users.length)];
      comments.push({
        userId: commenter.id,
        postId: post.id,
        content: `정말 좋은 글이네요! ${j + 1}번째 댓글입니다.`,
      });
    }

    const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
    const likers = shuffledUsers.slice(0, likeCount);
    for (const liker of likers) {
      likes.push({
        userId: liker.id,
        postId: post.id,
        isActive: true,
      });
    }
  }

  // 데이터량이 많으므로 청크 단위로 생성
  const chunkSize = 5000;
  for (let i = 0; i < comments.length; i += chunkSize) {
    await prisma.comment.createMany({ data: comments.slice(i, i + chunkSize) });
  }
  for (let i = 0; i < likes.length; i += chunkSize) {
    await prisma.like.createMany({ data: likes.slice(i, i + chunkSize) });
  }

  console.log("샘플 데이터 생성이 완료되었습니다!");
  console.log(`- 생성된 유저: ${users.length}명`);
  console.log(`- 생성된 Frag: ${frags.length}개`);
  console.log(`- 생성된 게시글: ${posts.length}개`);
  console.log(`- 생성된 댓글: ${comments.length}개`);
  console.log(`- 생성된 좋아요: ${likes.length}개`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
