import { PrismaClient, CollegeType, ExamType, CourseLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cutoff.deleteMany();
  await prisma.ranking.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.collegeExam.deleteMany();
  await prisma.collegeCourse.deleteMany();
  await prisma.article.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const passHash = await bcrypt.hash('password123', 10);
  const user1 = await prisma.user.create({ data: { name: 'Rahul Sharma', email: 'rahul@example.com', passwordHash: passHash } });
  const user2 = await prisma.user.create({ data: { name: 'Priya Patel', email: 'priya@example.com', passwordHash: passHash } });

  // Create Courses
  const courses = await Promise.all([
    prisma.course.create({ data: { name: 'B.Tech Computer Science', slug: 'btech-cs', stream: 'Engineering', durationYears: 4, level: 'UNDERGRADUATE', description: 'Bachelor of Technology in Computer Science and Engineering', eligibility: '10+2 with PCM, min 60%', avgFee: 400000 } }),
    prisma.course.create({ data: { name: 'B.Tech Electronics', slug: 'btech-ece', stream: 'Engineering', durationYears: 4, level: 'UNDERGRADUATE', description: 'Bachelor of Technology in Electronics and Communication', eligibility: '10+2 with PCM, min 60%', avgFee: 350000 } }),
    prisma.course.create({ data: { name: 'B.Tech Mechanical', slug: 'btech-mech', stream: 'Engineering', durationYears: 4, level: 'UNDERGRADUATE', description: 'Bachelor of Technology in Mechanical Engineering', eligibility: '10+2 with PCM, min 60%', avgFee: 350000 } }),
    prisma.course.create({ data: { name: 'MBA', slug: 'mba', stream: 'Management', durationYears: 2, level: 'POSTGRADUATE', description: 'Master of Business Administration', eligibility: 'Graduation with min 50%', avgFee: 800000 } }),
    prisma.course.create({ data: { name: 'MBBS', slug: 'mbbs', stream: 'Medical', durationYears: 5.5, level: 'UNDERGRADUATE', description: 'Bachelor of Medicine and Surgery', eligibility: '10+2 with PCB, min 50%, NEET qualified', avgFee: 500000 } }),
    prisma.course.create({ data: { name: 'B.Tech AI & ML', slug: 'btech-ai-ml', stream: 'Engineering', durationYears: 4, level: 'UNDERGRADUATE', description: 'B.Tech in Artificial Intelligence and Machine Learning', eligibility: '10+2 with PCM, min 60%', avgFee: 450000 } }),
    prisma.course.create({ data: { name: 'BBA', slug: 'bba', stream: 'Management', durationYears: 3, level: 'UNDERGRADUATE', description: 'Bachelor of Business Administration', eligibility: '10+2 any stream, min 50%', avgFee: 200000 } }),
    prisma.course.create({ data: { name: 'B.Tech Data Science', slug: 'btech-ds', stream: 'Engineering', durationYears: 4, level: 'UNDERGRADUATE', description: 'B.Tech in Data Science', eligibility: '10+2 with PCM, min 60%', avgFee: 420000 } }),
    prisma.course.create({ data: { name: 'M.Tech Computer Science', slug: 'mtech-cs', stream: 'Engineering', durationYears: 2, level: 'POSTGRADUATE', description: 'Master of Technology in CS', eligibility: 'B.Tech/BE with GATE score', avgFee: 200000 } }),
    prisma.course.create({ data: { name: 'BA LLB', slug: 'ba-llb', stream: 'Law', durationYears: 5, level: 'UNDERGRADUATE', description: 'Integrated BA LLB program', eligibility: '10+2 any stream, min 45%', avgFee: 300000 } }),
  ]);

  // Create Exams
  const exams = await Promise.all([
    prisma.exam.create({ data: { name: 'JEE Main', slug: 'jee-main', fullName: 'Joint Entrance Examination Main', type: 'ENGINEERING', conductingBody: 'NTA', examDate: new Date('2025-04-10'), registrationStart: new Date('2025-01-15'), registrationEnd: new Date('2025-03-01'), eligibility: '10+2 with PCM, min 75%', examPattern: 'MCQ + Numerical, 300 marks, 3 hours' } }),
    prisma.exam.create({ data: { name: 'JEE Advanced', slug: 'jee-advanced', fullName: 'Joint Entrance Examination Advanced', type: 'ENGINEERING', conductingBody: 'IIT Madras', examDate: new Date('2025-06-01'), eligibility: 'Top 2.5 lakh in JEE Main', examPattern: '2 papers, MCQ + Numerical, 3 hours each' } }),
    prisma.exam.create({ data: { name: 'CAT', slug: 'cat', fullName: 'Common Admission Test', type: 'MBA', conductingBody: 'IIM', examDate: new Date('2025-11-24'), eligibility: 'Graduation with min 50%', examPattern: 'VARC, DILR, QA - 198 marks, 2 hours' } }),
    prisma.exam.create({ data: { name: 'NEET', slug: 'neet', fullName: 'National Eligibility cum Entrance Test', type: 'MEDICAL', conductingBody: 'NTA', examDate: new Date('2025-05-04'), eligibility: '10+2 with PCB, min 50%', examPattern: 'MCQ, 720 marks, 3 hours 20 mins' } }),
    prisma.exam.create({ data: { name: 'GATE', slug: 'gate', fullName: 'Graduate Aptitude Test in Engineering', type: 'ENGINEERING', conductingBody: 'IISc/IITs', examDate: new Date('2025-02-01'), eligibility: 'Final year B.Tech/BE or completed', examPattern: 'MCQ + NAT, 100 marks, 3 hours' } }),
    prisma.exam.create({ data: { name: 'CLAT', slug: 'clat', fullName: 'Common Law Admission Test', type: 'LAW', conductingBody: 'Consortium of NLUs', examDate: new Date('2025-12-01'), eligibility: '10+2 with min 45%', examPattern: 'MCQ, 150 marks, 2 hours' } }),
  ]);

  // College data
  const collegeData = [
    { name: 'Indian Institute of Technology Bombay', slug: 'iit-bombay', type: 'GOVERNMENT' as CollegeType, city: 'Mumbai', state: 'Maharashtra', establishedYear: 1958, rating: 4.8, totalReviews: 245, description: 'IIT Bombay is one of the premier engineering institutions in India, known for its cutting-edge research and world-class education.', affiliation: 'UGC', approval: 'AICTE', websiteUrl: 'https://www.iitb.ac.in', contactEmail: 'info@iitb.ac.in', admissionProcess: 'Through JEE Advanced rank' },
    { name: 'Indian Institute of Technology Delhi', slug: 'iit-delhi', type: 'GOVERNMENT' as CollegeType, city: 'New Delhi', state: 'Delhi', establishedYear: 1961, rating: 4.7, totalReviews: 210, description: 'IIT Delhi is a premier autonomous engineering and technology university.', affiliation: 'UGC', approval: 'AICTE', websiteUrl: 'https://www.iitd.ac.in', admissionProcess: 'Through JEE Advanced rank' },
    { name: 'Indian Institute of Technology Madras', slug: 'iit-madras', type: 'GOVERNMENT' as CollegeType, city: 'Chennai', state: 'Tamil Nadu', establishedYear: 1959, rating: 4.9, totalReviews: 280, description: 'IIT Madras consistently ranked #1 in India for engineering education.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Advanced rank' },
    { name: 'Indian Institute of Technology Kanpur', slug: 'iit-kanpur', type: 'GOVERNMENT' as CollegeType, city: 'Kanpur', state: 'Uttar Pradesh', establishedYear: 1959, rating: 4.6, totalReviews: 180, description: 'Known for academic excellence and innovative research programs.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Advanced rank' },
    { name: 'BITS Pilani', slug: 'bits-pilani', type: 'DEEMED' as CollegeType, city: 'Pilani', state: 'Rajasthan', establishedYear: 1964, rating: 4.5, totalReviews: 190, description: 'Birla Institute of Technology and Science — a premier deemed university.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through BITSAT score' },
    { name: 'NIT Trichy', slug: 'nit-trichy', type: 'GOVERNMENT' as CollegeType, city: 'Tiruchirappalli', state: 'Tamil Nadu', establishedYear: 1964, rating: 4.4, totalReviews: 165, description: 'National Institute of Technology Tiruchirappalli, top NIT.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Main rank' },
    { name: 'NIT Warangal', slug: 'nit-warangal', type: 'GOVERNMENT' as CollegeType, city: 'Warangal', state: 'Telangana', establishedYear: 1959, rating: 4.3, totalReviews: 155, description: 'One of the oldest and most reputed NITs in India.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Main rank' },
    { name: 'VIT Vellore', slug: 'vit-vellore', type: 'PRIVATE' as CollegeType, city: 'Vellore', state: 'Tamil Nadu', establishedYear: 1984, rating: 4.2, totalReviews: 320, description: 'Vellore Institute of Technology, a leading private engineering college.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through VITEEE rank' },
    { name: 'SRM Institute', slug: 'srm-chennai', type: 'PRIVATE' as CollegeType, city: 'Chennai', state: 'Tamil Nadu', establishedYear: 1985, rating: 4.0, totalReviews: 290, description: 'SRM Institute of Science and Technology.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through SRMJEEE' },
    { name: 'IIM Ahmedabad', slug: 'iim-ahmedabad', type: 'GOVERNMENT' as CollegeType, city: 'Ahmedabad', state: 'Gujarat', establishedYear: 1961, rating: 4.9, totalReviews: 150, description: 'India\'s premier management institute.', affiliation: 'UGC', admissionProcess: 'Through CAT score + interview' },
    { name: 'IIM Bangalore', slug: 'iim-bangalore', type: 'GOVERNMENT' as CollegeType, city: 'Bangalore', state: 'Karnataka', establishedYear: 1973, rating: 4.8, totalReviews: 140, description: 'One of the top B-schools in Asia.', affiliation: 'UGC', admissionProcess: 'Through CAT score + interview' },
    { name: 'Delhi University', slug: 'delhi-university', type: 'GOVERNMENT' as CollegeType, city: 'New Delhi', state: 'Delhi', establishedYear: 1922, rating: 4.3, totalReviews: 400, description: 'One of the largest and most prestigious universities in India.', affiliation: 'UGC', admissionProcess: 'CUET based admission' },
    { name: 'Manipal Institute of Technology', slug: 'mit-manipal', type: 'PRIVATE' as CollegeType, city: 'Manipal', state: 'Karnataka', establishedYear: 1957, rating: 4.1, totalReviews: 250, description: 'Leading private engineering institute with excellent placements.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through MET rank' },
    { name: 'IIIT Hyderabad', slug: 'iiit-hyderabad', type: 'GOVERNMENT' as CollegeType, city: 'Hyderabad', state: 'Telangana', establishedYear: 1998, rating: 4.6, totalReviews: 120, description: 'Premier institute for IT and CS research.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Main + UGEE' },
    { name: 'AIIMS Delhi', slug: 'aiims-delhi', type: 'GOVERNMENT' as CollegeType, city: 'New Delhi', state: 'Delhi', establishedYear: 1956, rating: 4.9, totalReviews: 95, description: 'All India Institute of Medical Sciences — premier medical college.', affiliation: 'MCI', admissionProcess: 'Through NEET rank' },
    { name: 'NLU Delhi', slug: 'nlu-delhi', type: 'GOVERNMENT' as CollegeType, city: 'New Delhi', state: 'Delhi', establishedYear: 2008, rating: 4.5, totalReviews: 75, description: 'National Law University Delhi — top law school.', admissionProcess: 'Through CLAT / AILET' },
    { name: 'IIT Kharagpur', slug: 'iit-kharagpur', type: 'GOVERNMENT' as CollegeType, city: 'Kharagpur', state: 'West Bengal', establishedYear: 1951, rating: 4.7, totalReviews: 220, description: 'The first IIT established in India.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Advanced rank' },
    { name: 'IIT Roorkee', slug: 'iit-roorkee', type: 'GOVERNMENT' as CollegeType, city: 'Roorkee', state: 'Uttarakhand', establishedYear: 1847, rating: 4.5, totalReviews: 195, description: 'One of the oldest technical institutions in Asia.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Advanced rank' },
    { name: 'Thapar Institute', slug: 'thapar-patiala', type: 'PRIVATE' as CollegeType, city: 'Patiala', state: 'Punjab', establishedYear: 1956, rating: 4.0, totalReviews: 170, description: 'Deemed university with strong engineering programs.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Main / Board marks' },
    { name: 'NIT Surathkal', slug: 'nit-surathkal', type: 'GOVERNMENT' as CollegeType, city: 'Mangalore', state: 'Karnataka', establishedYear: 1960, rating: 4.4, totalReviews: 160, description: 'Top NIT with excellent placement records.', affiliation: 'UGC', approval: 'AICTE', admissionProcess: 'Through JEE Main rank' },
  ];

  const colleges = [];
  for (const data of collegeData) {
    const c = await prisma.college.create({ data });
    colleges.push(c);
  }

  // Link courses to colleges
  const engineeringColleges = colleges.filter(c => ['iit-bombay','iit-delhi','iit-madras','iit-kanpur','bits-pilani','nit-trichy','nit-warangal','vit-vellore','srm-chennai','mit-manipal','iiit-hyderabad','iit-kharagpur','iit-roorkee','thapar-patiala','nit-surathkal'].includes(c.slug));
  const mbaColleges = colleges.filter(c => ['iim-ahmedabad','iim-bangalore','delhi-university'].includes(c.slug));

  for (const col of engineeringColleges) {
    const isIIT = col.slug.startsWith('iit');
    const feeMultiplier = col.type === 'GOVERNMENT' ? 1 : 3;
    await prisma.collegeCourse.createMany({
      data: [
        { collegeId: col.id, courseId: courses[0].id, fee: 200000 * feeMultiplier, seats: isIIT ? 120 : 180 },
        { collegeId: col.id, courseId: courses[1].id, fee: 190000 * feeMultiplier, seats: isIIT ? 80 : 120 },
        { collegeId: col.id, courseId: courses[2].id, fee: 185000 * feeMultiplier, seats: isIIT ? 80 : 120 },
        { collegeId: col.id, courseId: courses[5].id, fee: 220000 * feeMultiplier, seats: isIIT ? 60 : 90 },
        { collegeId: col.id, courseId: courses[7].id, fee: 210000 * feeMultiplier, seats: isIIT ? 60 : 90 },
      ],
    });
  }

  for (const col of mbaColleges) {
    await prisma.collegeCourse.create({ data: { collegeId: col.id, courseId: courses[3].id, fee: col.slug.includes('iim') ? 2300000 : 150000, seats: col.slug.includes('iim') ? 400 : 600 } });
  }

  // AIIMS - MBBS
  const aiims = colleges.find(c => c.slug === 'aiims-delhi')!;
  await prisma.collegeCourse.create({ data: { collegeId: aiims.id, courseId: courses[4].id, fee: 7500, seats: 100 } });

  // NLU - Law
  const nlu = colleges.find(c => c.slug === 'nlu-delhi')!;
  await prisma.collegeCourse.create({ data: { collegeId: nlu.id, courseId: courses[9].id, fee: 250000, seats: 80 } });

  // Link exams to colleges
  for (const col of engineeringColleges) {
    const isIIT = col.slug.startsWith('iit');
    const examIds = isIIT ? [exams[0].id, exams[1].id, exams[4].id] : [exams[0].id, exams[4].id];
    await prisma.collegeExam.createMany({
      data: examIds.map(examId => ({ collegeId: col.id, examId })),
    });
  }
  for (const col of mbaColleges) {
    await prisma.collegeExam.create({ data: { collegeId: col.id, examId: exams[2].id } });
  }
  await prisma.collegeExam.create({ data: { collegeId: aiims.id, examId: exams[3].id } });
  await prisma.collegeExam.create({ data: { collegeId: nlu.id, examId: exams[5].id } });

  // Placements
  const placementData: { slug: string; highest: number; avg: number; median: number; rate: number; recruiters: string[] }[] = [
    { slug: 'iit-bombay', highest: 27000000, avg: 2100000, median: 1800000, rate: 95, recruiters: ['Google','Microsoft','Goldman Sachs','Amazon','Apple'] },
    { slug: 'iit-delhi', highest: 26000000, avg: 2000000, median: 1700000, rate: 94, recruiters: ['Google','Meta','McKinsey','Morgan Stanley','Uber'] },
    { slug: 'iit-madras', highest: 28000000, avg: 2150000, median: 1850000, rate: 96, recruiters: ['Google','Microsoft','Samsung','Intel','Qualcomm'] },
    { slug: 'iit-kanpur', highest: 22000000, avg: 1800000, median: 1500000, rate: 92, recruiters: ['Google','Microsoft','Flipkart','Samsung','Adobe'] },
    { slug: 'bits-pilani', highest: 18000000, avg: 1500000, median: 1200000, rate: 90, recruiters: ['Google','Microsoft','Goldman Sachs','DE Shaw','Sprinklr'] },
    { slug: 'nit-trichy', highest: 14000000, avg: 1100000, median: 900000, rate: 88, recruiters: ['TCS','Infosys','Amazon','Microsoft','Deloitte'] },
    { slug: 'vit-vellore', highest: 12000000, avg: 800000, median: 600000, rate: 82, recruiters: ['Cognizant','TCS','Wipro','Amazon','Microsoft'] },
    { slug: 'iim-ahmedabad', highest: 55000000, avg: 3200000, median: 2800000, rate: 100, recruiters: ['McKinsey','BCG','Bain','Goldman Sachs','Google'] },
    { slug: 'iim-bangalore', highest: 50000000, avg: 3100000, median: 2700000, rate: 100, recruiters: ['Amazon','Google','McKinsey','Accenture Strategy','BCG'] },
    { slug: 'iiit-hyderabad', highest: 20000000, avg: 1600000, median: 1300000, rate: 93, recruiters: ['Google','Microsoft','Amazon','Uber','Qualcomm'] },
    { slug: 'iit-kharagpur', highest: 25000000, avg: 1900000, median: 1600000, rate: 93, recruiters: ['Google','Microsoft','JP Morgan','Goldman Sachs','Flipkart'] },
    { slug: 'iit-roorkee', highest: 21000000, avg: 1700000, median: 1400000, rate: 91, recruiters: ['Google','Microsoft','Samsung','Adobe','Qualcomm'] },
  ];

  for (const p of placementData) {
    const col = colleges.find(c => c.slug === p.slug);
    if (col) {
      await prisma.placement.create({
        data: { collegeId: col.id, year: 2024, highestPackage: p.highest, avgPackage: p.avg, medianPackage: p.median, placementRate: p.rate, topRecruiters: p.recruiters },
      });
    }
  }

  // Rankings
  const rankingData = [
    { slug: 'iit-madras', body: 'NIRF', rank: 1, year: 2024 },
    { slug: 'iit-bombay', body: 'NIRF', rank: 3, year: 2024 },
    { slug: 'iit-delhi', body: 'NIRF', rank: 2, year: 2024 },
    { slug: 'iit-kanpur', body: 'NIRF', rank: 4, year: 2024 },
    { slug: 'iit-kharagpur', body: 'NIRF', rank: 5, year: 2024 },
    { slug: 'iit-roorkee', body: 'NIRF', rank: 6, year: 2024 },
    { slug: 'bits-pilani', body: 'NIRF', rank: 24, year: 2024 },
    { slug: 'nit-trichy', body: 'NIRF', rank: 9, year: 2024 },
    { slug: 'nit-surathkal', body: 'NIRF', rank: 12, year: 2024 },
    { slug: 'iiit-hyderabad', body: 'NIRF', rank: 18, year: 2024 },
    { slug: 'iim-ahmedabad', body: 'NIRF', rank: 1, year: 2024 },
    { slug: 'iim-bangalore', body: 'NIRF', rank: 2, year: 2024 },
    { slug: 'aiims-delhi', body: 'NIRF', rank: 1, year: 2024 },
  ];

  for (const r of rankingData) {
    const col = colleges.find(c => c.slug === r.slug);
    if (col) {
      await prisma.ranking.create({ data: { collegeId: col.id, body: r.body, rank: r.rank, year: r.year } });
    }
  }

  // Reviews
  const reviewData = [
    { slug: 'iit-bombay', userId: user1.id, rating: 5, title: 'World-class education', content: 'Amazing campus, brilliant peers, and incredible placement opportunities. The curriculum is challenging but rewarding.' },
    { slug: 'iit-bombay', userId: user2.id, rating: 4.5, title: 'Great research culture', content: 'Research opportunities are unmatched. Faculty is top-notch and always available for guidance.' },
    { slug: 'iit-delhi', userId: user1.id, rating: 4.5, title: 'Excellent campus life', content: 'Great balance of academics and extracurriculars. Delhi location adds to the experience.' },
    { slug: 'bits-pilani', userId: user2.id, rating: 4, title: 'Flexible curriculum', content: 'The freedom to choose courses and the PS/thesis program makes BITS unique.' },
    { slug: 'vit-vellore', userId: user1.id, rating: 3.5, title: 'Good for beginners', content: 'Decent infrastructure and placement support. Could improve on research output.' },
    { slug: 'iim-ahmedabad', userId: user2.id, rating: 5, title: 'Best B-School', content: 'Transformative experience. Case-study pedagogy and peer learning are exceptional.' },
  ];

  for (const r of reviewData) {
    const col = colleges.find(c => c.slug === r.slug);
    if (col) {
      await prisma.review.create({ data: { collegeId: col.id, userId: r.userId, rating: r.rating, title: r.title, content: r.content } });
    }
  }

  // Articles
  await prisma.article.createMany({
    data: [
      { title: 'Top 10 Engineering Colleges in India 2024', slug: 'top-10-engineering-colleges-2024', excerpt: 'A comprehensive guide to the best engineering institutions in India.', content: 'India has some of the finest engineering colleges globally. IIT Madras leads the NIRF rankings for 2024, followed by IIT Delhi and IIT Bombay. This guide covers admission processes, placements, and what makes each institution unique.', authorName: 'Editorial Team', category: 'Rankings', tags: ['engineering', 'rankings', 'iit'], readTime: 8 },
      { title: 'JEE Main 2025: Complete Preparation Guide', slug: 'jee-main-2025-preparation', excerpt: 'Everything you need to know about JEE Main 2025 exam preparation.', content: 'JEE Main is the gateway to NITs, IIITs, and CFTIs. This guide covers syllabus breakdown, recommended books, time management strategies, and mock test resources. Start your preparation early for the best results.', authorName: 'Dr. Amit Kumar', category: 'Exam Prep', tags: ['jee', 'engineering', 'preparation'], readTime: 12 },
      { title: 'MBA vs MS: Which is Right for You?', slug: 'mba-vs-ms-comparison', excerpt: 'A detailed comparison to help you choose between MBA and MS programs.', content: 'Choosing between an MBA and an MS depends on career goals, work experience, and academic interests. MBA programs focus on management, while MS programs offer deep technical specialization. Consider your long-term goals carefully.', authorName: 'Career Counselor', category: 'Guidance', tags: ['mba', 'ms', 'career'], readTime: 6 },
    ],
  });

  // Save some colleges for users
  await prisma.savedCollege.createMany({
    data: [
      { userId: user1.id, collegeId: colleges[0].id },
      { userId: user1.id, collegeId: colleges[2].id },
      { userId: user1.id, collegeId: colleges[4].id },
    ],
  });

  console.log('✅ Seeding complete!');
  console.log(`   Created ${colleges.length} colleges, ${courses.length} courses, ${exams.length} exams`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
