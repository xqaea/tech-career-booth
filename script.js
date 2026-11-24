/* ========== DEFAULT SETTINGS (you can also change these in the app: Home > Settings) ========== */
const DEFAULTS = {
  boothTitle: 'Tech Career Booth',
  courseName: 'BS Computer Science',
  tagline: 'Discover your future in tech!',
  idleSeconds: 90,                      // go back Home when nobody is playing
  attractSeconds: 30,                   // show attract mode on Home after this many idle seconds
  levelSeconds: [65, 100, 50, 70, 65, 100, 70, 70, 60],   // Easy-mode timers for all mini-games
  hintCost: 50,                         // points deducted per hint
  musicDefault: true,
  adminPin: '1234',
  strands: ['STEM', 'ABM', 'HUMSS', 'GAS', 'TVL-ICT', 'TVL (Other)', 'Arts & Design', 'Sports', 'Other']
};
let CONFIG = Object.assign({}, DEFAULTS);
/* ============================================================================================== */

const CAREERS = {
  dev: {name:'Software / Web Developer', icon:'💻', desc:'Builds the apps, websites, and systems people use every day.',
    day:'Writes code, fixes bugs, and works with a team to build new features for apps and websites.',
    skills:['Problem solving','Programming (JavaScript, Python, Java)','Teamwork & Git'], jobs:['Web Developer','Mobile App Developer','Back-end Engineer']},
  data: {name:'Data Analyst / Scientist', icon:'📊', desc:'Turns raw numbers into answers and smart decisions.',
    day:'Cleans data, builds charts and dashboards, and finds patterns that help companies decide.',
    skills:['Statistics & Math','Excel, SQL, Python','Curiosity & storytelling'], jobs:['Data Analyst','Business Intelligence Analyst','Data Scientist']},
  cyber: {name:'Cybersecurity Analyst', icon:'🛡️', desc:'Protects people and companies from hackers and scams.',
    day:'Monitors systems for attacks, investigates suspicious activity, and teaches users how to stay safe online.',
    skills:['Attention to detail','Networking basics','Ethical hacking'], jobs:['SOC Analyst','Penetration Tester','Security Engineer']},
  uiux: {name:'UI/UX Designer', icon:'🎨', desc:'Designs apps that are easy and enjoyable to use.',
    day:'Talks to users, sketches screens, builds prototypes in Figma, and tests them with real people.',
    skills:['Empathy','Design principles','Figma & prototyping'], jobs:['UI Designer','UX Researcher','Product Designer']},
  game: {name:'Game Developer', icon:'🎮', desc:'Creates the games people love to play.',
    day:'Programs game mechanics, builds levels, and playtests again and again until the game is fun.',
    skills:['Programming (C#, C++)','Math & physics','Creativity (Unity / Unreal)'], jobs:['Game Programmer','Level Designer','Technical Artist']},
  network: {name:'Network & Cloud Engineer', icon:'🌐', desc:'Keeps the internet, servers, and cloud running 24/7.',
    day:'Sets up networks and servers, keeps systems online, and fixes outages fast.',
    skills:['Networking','Linux & servers','Cloud (AWS / Azure)'], jobs:['Network Administrator','Cloud Engineer','DevOps Engineer']},
  ai: {name:'AI / Machine Learning Engineer', icon:'🤖', desc:'Teaches computers to learn, predict, and understand.',
    day:'Trains models using data, tests how accurate they are, and builds smart features like chatbots and recommendations.',
    skills:['Math (algebra, statistics)','Python','Research mindset'], jobs:['ML Engineer','AI Researcher','Computer Vision Engineer']},
  qa: {name:'QA / Software Tester', icon:'🔍', desc:'Makes sure software works before people use it.',
    day:'Tests apps, hunts for bugs, and writes test cases and automated tests so nothing breaks.',
    skills:['Attention to detail','Critical thinking','Test automation'], jobs:['QA Engineer','Test Automation Engineer','Software Tester']}
};

const QUIZ = [
  {q:'On a free weekend, you would rather…', o:[
    ['🛠️','Fix or upgrade a computer or gadget',['dev','network']],
    ['🎮','Play or plan out a new game',['game']],
    ['🖌️','Draw, design, or edit photos',['uiux']],
    ['🕵️','Watch a mystery or crime documentary',['cyber']]]},
  {q:'Your favorite subject is…', o:[
    ['➗','Math or Statistics',['data','ai']],
    ['🎭','Arts or Multimedia',['uiux','game']],
    ['🔬','Science or Physics',['ai','network']],
    ['📝','English or Research',['qa','data']]]},
  {q:'In a group project, you are usually the…', o:[
    ['🚀','One who builds the main output',['dev']],
    ['🎨','Designer of the slides and layout',['uiux']],
    ['🔎','Checker who finds mistakes',['qa','data']],
    ['🔌','Tech support who sets up the laptop & projector',['network']]]},
  {q:'If you could create any app, it would be…', o:[
    ['📱','A social app for your school',['dev']],
    ['👾','A mobile game',['game']],
    ['💬','A chatbot that answers any question',['ai']],
    ['🚫','An app that blocks scammers',['cyber']]]},
  {q:'Your Wi-Fi or app suddenly stops working. You…', o:[
    ['🧪','Test every possible cause one by one',['qa']],
    ['🌐','Google the error and try fixes',['dev']],
    ['🕵️','Wonder if someone hacked it',['cyber']],
    ['📡','Check the router and cables first',['network']]]},
  {q:'Which puzzle sounds the most fun?', o:[
    ['🔢','Sudoku or number patterns',['data']],
    ['🔐','An escape room full of codes',['cyber']],
    ['🧱','Building something in Minecraft',['game','dev']],
    ['👀','Spot-the-difference',['qa','uiux']]]},
  {q:'When you use a new app, what do you notice first?', o:[
    ['✨','How it looks and feels',['uiux']],
    ['⚡','How fast it runs',['dev','network']],
    ['🐞','Glitches and mistakes',['qa']],
    ['🎯','How it recommends things to me',['ai','data']]]},
  {q:'Your dream workplace is…', o:[
    ['🏢','A startup building new apps',['dev']],
    ['🕹️','A game studio',['game']],
    ['🏦','A bank or government security team',['cyber']],
    ['🧠','An AI or research lab',['ai','data']],
    ['🖼️','A design agency',['uiux']],
    ['☁️','A data center or cloud company',['network']]]},
  {q:'Pick a superpower:', o:[
    ['💭','Read minds (understand what people need)',['uiux']],
    ['🔮','See the future (predict what will happen)',['data','ai']],
    ['👻','Invisibility (sneak past any defense)',['cyber']],
    ['🌀','Teleport (connect anywhere instantly)',['network']]]},
  {q:'Which line sounds the most like you?', o:[
    ['🤔','"How does this actually work?"',['ai']],
    ['💡','"How can I make this easier to use?"',['uiux']],
    ['⚠️','"What if this breaks?"',['qa','cyber']],
    ['🔨','"Let\'s just build it!"',['dev','game']]]}
];

const PHISH = [
  {k:'email',from:'BDO Unibank <security@bdo-verify-login.xyz>',subj:'URGENT: Account Locked',body:'Your account has been locked due to unusual activity. Verify your identity within 1 hour at bdo-verify-login.xyz or your account will be closed.',phish:true,why:'Fake domain (.xyz) + panic deadline. Banks never ask you to verify through random links.'},
  {k:'sms',from:'GCash',body:'Your GCash OTP is 482913. NEVER share this code with anyone, including GCash employees.',phish:false,why:'A normal OTP message: no link, and it warns you not to share it.'},
  {k:'sms',from:'+63 917 555 0142',body:'CONGRATS! You won an iPhone 15 from the Shopee Raffle! Claim now: bit.ly/fr33-iphone15 before 5PM!',phish:true,why:'Unknown number, a prize you never joined, and a shortened link.'},
  {k:'email',from:'LMS Admin <it-support@school.edu.ph>',subj:'Scheduled LMS Maintenance',body:'The LMS will be offline this Saturday from 8:00 PM to 10:00 PM for maintenance. No action is needed on your part.',phish:false,why:'Official school domain, just information, and it asks for nothing.'},
  {k:'sms',from:'+63 998 123 4567',body:"Hi anak, si Ma'am Santos ito, bagong number ko. Paki-send ng ₱1,000 sa GCash ko para sa project fee, urgent!",phish:true,why:'"New number" + urgent money request = classic impersonation scam.'},
  {k:'email',from:'Netflix <billing@netfIix-support.com>',subj:'Payment Failed',body:"We couldn't process your payment. Update your card details within 24 hours to avoid losing access.",phish:true,why:'Look closely: "netfIix" uses a capital I instead of a small L.'},
  {k:'sms',from:'Lazada',body:'Your order #LZ58213 has been shipped! Track it anytime in the Lazada app.',phish:false,why:'No link and no request for info. It just points you to the official app.'},
  {k:'email',from:'HR Hiring Team <jobs.hiring2026@gmail.com>',subj:'Earn ₱5,000/day from home!',body:'Just like TikTok videos and earn ₱5,000 daily! Send a photo of your valid ID and a ₱300 registration fee to start.',phish:true,why:'Too good to be true, and it asks for your ID and money upfront.'},
  {k:'email',from:'Google Classroom <no-reply@classroom.google.com>',subj:'New assignment: Gen Math 11',body:'Ms. Reyes posted a new assignment: "Problem Set 4". Due Friday, 11:59 PM.',phish:false,why:'Official Google domain and normal class information.'},
  {k:'email',from:'PayPal Security <service@paypa1-secure.net>',subj:'Confirm your identity',body:'Dear Customer, kindly reply with your password and card number so we can confirm your identity.',phish:true,why:'No real company asks for your password. Also, "paypa1" uses the number 1.'},
  {k:'sms',from:'Meralco',body:'Your October bill is ₱2,345.60, due Nov 15. Pay via the Meralco app or authorized payment centers.',phish:false,why:'No link and no personal info requested. It points you to official channels.'},
  {k:'sms',from:'+63 905 777 8899',body:'LBC: Your parcel is on hold due to incomplete address. Pay ₱45 re-delivery fee here: lbc-ph-track.top',phish:true,why:'Random number + weird ".top" link + small fee = parcel scam.'},
  {k:'sms',from:'Smart',body:'You have successfully registered to GIGA Video 99. Valid for 7 days. Dial *123# to check your balance.',phish:false,why:'Normal promo confirmation. No link, and it points you to the official *123# menu.'},
  {k:'email',from:'DepEd Scholarship <deped.scholarship.ph@yahoo.com>',subj:'You qualified for a ₱20,000 scholarship!',body:"Congratulations! To receive your scholarship, fill out this form with your parents' bank account and card PIN: forms-deped-grant.online",phish:true,why:'Government offices use .gov.ph, not Yahoo. And nobody needs your card PIN.'},
  {k:'sms',from:'Shopee',body:'[Shopee] 591034 is your verification code. Do not share this code with anyone.',phish:false,why:'Normal OTP: no link, and it reminds you not to share the code.'},
  {k:'email',from:'Spotify <no-reply@spotify.com>',subj:'Your Spotify Premium receipt',body:'Thanks for your payment of ₱149.00 for Spotify Premium Individual. You can view your receipts anytime on your account page.',phish:false,why:'Official spotify.com sender, a normal receipt, and no request for info.'},
  {k:'email',from:'Facebook Security <fb-security@meta-support-center.co>',subj:'Your page will be deleted',body:'Your page violated our copyright policy and will be deleted in 24 hours. Appeal now by logging in here: meta-support-center.co/appeal',phish:true,why:'Fake domain (not facebook.com or meta.com) + 24-hour threat + login link.'},
  {k:'sms',from:'+63 966 234 1188',body:'Hello po, na-wrong send ako ng ₱2,000 sa GCash mo. Pwede mo ba ibalik sa number na ito? Salamat po!',phish:true,why:'"Wrong send" scam. Check your real GCash app first, and never send money because of a text.'},
  {k:'email',from:'Canva <marketing@engage.canva.com>',subj:'New templates for your school projects',body:'Check out 50 new presentation templates for students. Open Canva to start designing.',phish:false,why:'Real Canva sending domain, just a newsletter, and it asks for nothing.'},
  {k:'sms',from:'BPI-Alert',body:'BPI: A ₱15,000 transfer was made from your account. If this was not you, CANCEL here: bpi-cancel-txn.info',phish:true,why:'Scary amount + weird link. Banks tell you to call their official hotline, not click links.'},
  {k:'email',from:'Steam Support <support@steamcommunlty.com>',subj:'Free 10,000 Robux / Steam Wallet',body:'Claim your free gaming credits! Just log in with your Steam and Roblox account details here before the promo ends.',phish:true,why:'"steamcommunlty" uses an L instead of an i. Free credits + asking for logins = scam.'},
  {k:'email',from:'Registrar <registrar@school.edu.ph>',subj:'Enrollment schedule for next semester',body:"Enrollment for Grade 12 will be on June 3–7 at the Registrar's Office. Please bring your report card. No online payment is required.",phish:false,why:'Official school domain, and it tells you to go in person. No links or payments.'},
  {k:'sms',from:'+63 912 345 6780',body:'GCash: Your account will be DEACTIVATED today. Verify your MPIN at gcash-verify-ph.com to keep using GCash.',phish:true,why:'Sent from a random number, not "GCash". GCash will never ask for your MPIN.'},
  {k:'sms',from:'J&T Express',body:'Your parcel JT0123456789 is out for delivery today. Please prepare the exact COD amount. Track via the J&T app.',phish:false,why:'Normal delivery update from the official sender, with no link or extra fee.'},
  {k:'sms',from:'+63 927 888 1234',body:'Hi! Congrats, napili ka as part-time online seller. Earn ₱3,000/day, just click this link para mag-register: tinyurl.com/kita-agad',phish:true,why:'Unknown number, an "easy money" offer, and a shortened link.'},
  {k:'sms',from:'Globe',body:'Salamat sa pag-load! Your GoSURF50 is now active until Nov 15. Dial *143# para i-check ang balance mo.',phish:false,why:'Official sender, no link, and it points you to the official *143# menu.'},
  {k:'sms',from:'+63 915 432 9876',body:'Bes! Ikaw ba ito sa video? 😱 Viral na, check mo dali: fb-video-viral.click/watch',phish:true,why:'Classic "is this you?" trick. The weird .click link steals your Facebook login.'}
];

const QA_SCENES = [
  {title:'Online School Supplies Cart', html:`
    <div class="app-bar" data-ok>🛒 My Cart (4 items)</div>
    <div class="app-body">
      <div class="cart-row"><span data-ok>Ballpen</span><span data-ok>2 × ₱15</span><b data-ok>₱30</b></div>
      <div class="cart-row"><span data-ok>Notebook</span><span data-ok>3 × ₱40</span><b data-bug="3 × ₱40 should be ₱120, not ₱100">₱100</b></div>
      <div class="cart-row"><span data-ok>Highlighter</span><span data-ok>1 × ₱35</span><b data-ok>₱35</b></div>
      <div class="cart-row" data-bug="Quantity can't be negative (-1)"><span>Bond Paper</span><span>-1 × ₱5</span><b>-₱5</b></div>
      <div class="sum-row"><span>Subtotal</span><span>₱160</span></div>
      <div class="sum-row"><span data-ok>Shipping</span><span data-ok>FREE</span></div>
      <div class="sum-row total"><span>Total</span><span data-bug="Total should be ₱160 since shipping is FREE">₱210</span></div>
      <div class="sum-row"><span data-ok>Delivery</span><span data-bug="February 30 doesn't exist!">Feb 30, 2026</span></div>
      <span class="fake-btn" data-bug='Typo: "Chekout" should be "Checkout"'>Chekout</span>
      <span class="fake-link" data-ok>← Continue shopping</span>
    </div>`},
  {title:'Student Registration Form', html:`
    <div class="app-bar" data-ok>🎓 Student Registration</div>
    <div class="app-body">
      <div class="form-row"><small>Full Name</small><span class="fake-input" data-ok>Juan Dela Cruz</span></div>
      <div class="form-row"><small>Age</small><span class="fake-input" data-bug="Age 250 was accepted. Missing input validation!">250</span></div>
      <div class="form-row"><small>Email</small><span class="fake-input" data-bug="Invalid email: it has two @ signs">juan.delacruz@@gmail.com</span></div>
      <div class="form-row"><small>Password</small><span class="fake-input" data-bug="Password is shown in plain text. It should be hidden (••••)">MyPassword123</span></div>
      <div class="form-row"><small>Strand</small><span class="fake-input" data-ok>STEM ▾</span></div>
      <div class="form-row"><small>Grade Level</small><span class="fake-input" data-bug="Senior High only has Grade 11 and 12">Grade 13 ▾</span></div>
      <div class="form-row"><span data-ok>☑ I agree to the Terms and Privacy Policy</span></div>
      <span class="fake-btn" data-bug='Typo: "Sumbit" should be "Submit"'>Sumbit</span>
      <span class="fake-link" data-ok>Already have an account? Log in</span>
    </div>`},
  {title:'Weather App', html:`
    <div class="app-bar" data-ok>☀️ Weather · Quezon City</div>
    <div class="app-body">
      <div class="sum-row total"><span data-ok>Now</span><span data-ok>32°C ☀️ Sunny</span></div>
      <div class="sum-row"><span data-ok>Feels like</span><span data-ok>36°C</span></div>
      <div class="sum-row"><span data-ok>Chance of rain</span><span data-bug="Chance of rain can't be more than 100%">120%</span></div>
      <div class="sum-row"><span data-ok>Humidity</span><span data-ok>70%</span></div>
      <div class="sum-row"><span data-ok>High / Low</span><span data-bug="The High (26°) is lower than the Low (34°)">26° / 34°</span></div>
      <div class="sum-row"><span data-ok>Sunrise</span><span data-ok>5:45 AM</span></div>
      <div class="sum-row"><span data-ok>Sunset</span><span data-bug="Sunset at 5:30 AM? It should be PM">5:30 AM</span></div>
      <div class="cart-row"><span data-ok>Mon ⛅ 31°</span><span data-ok>Tue 🌧️ 28°</span><span data-bug='Typo: "Wedsday" should be "Wednesday"'>Wedsday ☀️ 33°</span></div>
      <div class="sum-row"><span data-ok>Last updated</span><span data-bug="'5 minutes from now' is in the future">5 minutes from now</span></div>
      <span class="fake-btn" data-ok>See 7-Day Forecast</span>
    </div>`},
  {title:'Class Schedule App', html:`
    <div class="app-bar" data-ok>📅 My Class Schedule · Grade 11</div>
    <div class="app-body">
      <div class="sum-row"><span data-ok>Day</span><b data-bug="November only has 30 days">Monday, Nov 31</b></div>
      <div class="cart-row"><span data-ok>7:30–8:30</span><span data-ok>Gen Math</span><span data-ok>Rm 201</span></div>
      <div class="cart-row"><span data-ok>8:30–9:30</span><span data-ok>Earth Science</span><span data-ok>Lab 2</span></div>
      <div class="cart-row"><span data-bug="Recess ends before it starts (9:30 → 9:15)">9:30–9:15</span><span data-ok>Recess</span><span data-ok>Canteen</span></div>
      <div class="cart-row"><span data-ok>9:45–10:45</span><span data-ok>Oral Comm</span><span data-ok>Rm 105</span></div>
      <div class="cart-row"><span data-ok>10:45–11:45</span><span data-ok>PE</span><span data-ok>Gym</span></div>
      <div class="cart-row" data-bug="Two classes at the same time (10:45–11:45)"><span>10:45–11:45</span><span>Filipino</span><span>Rm 105</span></div>
      <div class="cart-row"><span data-ok>11:45–12:45</span><span data-ok>Lunch</span><span data-ok>Canteen</span></div>
      <div class="sum-row"><span data-ok>Subjects today</span><b data-bug="Only 5 subjects are listed, not 8">8</b></div>
      <span class="fake-btn" data-bug='Typo: "Downlaod" should be "Download"'>Downlaod Schedule</span>
    </div>`},
  {title:'Online Quiz Results', html:`
    <div class="app-bar" data-ok>📝 Quiz Results · General Biology</div>
    <div class="app-body">
      <div class="sum-row total"><span data-ok>Score</span><span data-ok>18 / 20</span></div>
      <div class="sum-row"><span data-ok>Percentage</span><span data-bug="18 out of 20 is 90%, not 80%">80%</span></div>
      <div class="sum-row"><span data-ok>Remarks</span><span data-ok>PASSED ✅</span></div>
      <div class="sum-row"><span data-ok>Class rank</span><span data-bug="There's no rank 0. Ranks start at 1">0 of 40</span></div>
      <div class="sum-row"><span data-ok>Time taken</span><span data-bug="Time taken can't be negative">-5 minutes</span></div>
      <div class="sum-row"><span data-ok>Submitted</span><span data-ok>Nov 10, 2026 · 9:41 AM</span></div>
      <div class="sum-row"><span data-ok>Attempts left</span><span data-bug="3 attempts left out of only 2 total?">3 of 2</span></div>
      <span class="fake-btn" data-ok>Review Answers</span>
      <span class="fake-link" data-bug='Typo: "Classs" has an extra s'>← Back to Classs</span>
    </div>`},
  {title:'Canteen Pre-Order', html:`
    <div class="app-bar" data-ok>🍱 Canteen Pre-Order</div>
    <div class="app-body">
      <div class="cart-row"><span data-ok>Chicken Adobo Rice</span><span data-ok>2 × ₱55</span><b data-ok>₱110</b></div>
      <div class="cart-row"><span data-ok>Pancit Canton</span><span data-ok>1 × ₱35</span><b data-ok>₱35</b></div>
      <div class="cart-row"><span data-ok>Iced Tea</span><span data-ok>3 × ₱20</span><b data-bug="3 × ₱20 should be ₱60, not ₱80">₱80</b></div>
      <div class="cart-row"><span data-ok>Banana Cue</span><span data-ok>2 × ₱10</span><b data-ok>₱20</b></div>
      <div class="sum-row"><span data-ok>Subtotal</span><span data-ok>₱225</span></div>
      <div class="sum-row"><span data-ok>Student discount</span><span data-ok>-₱25</span></div>
      <div class="sum-row total"><span>Total</span><span data-bug="₱225 minus ₱25 should be ₱200, not ₱250">₱250</span></div>
      <div class="sum-row"><span data-ok>Pickup time</span><span data-bug="12:75 doesn't exist. Minutes only go up to 59">12:75 PM</span></div>
      <div class="sum-row"><span data-ok>Estimated wait</span><span data-bug="Waiting time can't be negative">-10 minutes</span></div>
      <span class="fake-btn" data-bug='Typo: "Ordr" should be "Order"'>Place Ordr</span>
    </div>`},
  {title:'Library Borrowed Books', html:`
    <div class="app-bar" data-ok>📚 My Borrowed Books</div>
    <div class="app-body">
      <div class="cart-row"><span data-ok>Noli Me Tangere</span><span data-ok>Due: Dec 5</span><b data-ok>OK</b></div>
      <div class="cart-row"><span data-ok>El Filibusterismo</span><span data-bug="November only has 30 days">Due: Nov 31</span><b data-ok>OK</b></div>
      <div class="cart-row"><span data-ok>Python for Beginners</span><span data-bug="Renewed 7 times when the limit is only 2">Renewed: 7 of 2</span><b data-ok>OK</b></div>
      <div class="sum-row"><span data-ok>Books borrowed</span><span data-bug="Only 3 books are listed, not 4">4 of 5 allowed</span></div>
      <div class="sum-row"><span data-ok>Late fees</span><span data-bug="Fees can't be negative">-₱15.00</span></div>
      <span class="fake-btn" data-bug='Typo: "Alll" has an extra l'>Renew Alll Books</span>
      <span class="fake-link" data-ok>View borrowing history</span>
    </div>`}
];

const UX_PAIRS = [
  {q:'Which login screen is easier to read?', why:'Good contrast and bigger text make it readable for everyone.',
   good:`<div style="font-size:1.3rem;font-weight:800">Welcome back!</div><div style="font-size:.95rem">Enter your LRN and password</div><div class="mi" style="color:#111;border-color:#6b7280">LRN</div><div class="mi" style="color:#111;border-color:#6b7280">Password</div><span class="mb" style="background:#2563eb;color:#fff">Log In</span>`,
   bad:`<div style="font-size:.8rem;color:#d1d5db;font-weight:800">Welcome back!</div><div style="font-size:.65rem;color:#e5e7eb">Enter your LRN and password</div><div class="mi" style="color:#e5e7eb;border-color:#f3f4f6;font-size:.7rem">LRN</div><div class="mi" style="color:#e5e7eb;border-color:#f3f4f6;font-size:.7rem">Password</div><span class="mb" style="background:#f3f4f6;color:#e5e7eb;font-size:.7rem">login</span>`},
  {q:'Which pop-up is clearer?', why:'Buttons should say exactly what will happen.',
   good:`<div style="font-weight:800;font-size:1.15rem">Delete 120 photos?</div><div style="color:#4b5563">This can't be undone.</div><div style="display:flex;gap:8px"><span class="mb" style="flex:1;background:#e5e7eb">Keep Photos</span><span class="mb" style="flex:1;background:#dc2626;color:#fff">Delete 120 Photos</span></div>`,
   bad:`<div style="font-weight:800;font-size:1.15rem">Are you sure?</div><div style="color:#4b5563">&nbsp;</div><div style="display:flex;gap:8px"><span class="mb" style="flex:1;background:#2563eb;color:#fff">Yes</span><span class="mb" style="flex:1;background:#2563eb;color:#fff">No</span></div>`},
  {q:'Which error message is more helpful?', why:'Say what went wrong AND how to fix it, in plain words.',
   good:`<div style="font-size:2rem;text-align:center">🔒</div><div style="background:#fef3c7;border-radius:10px;padding:12px;color:#78350f;font-weight:700">Wrong password. Please try again, or tap "Forgot password?" to reset it.</div><span class="mb" style="background:#2563eb;color:#fff">Try Again</span>`,
   bad:`<div style="font-size:2rem;text-align:center">⛔</div><div style="background:#fee2e2;border-radius:10px;padding:12px;color:#991b1b;font-family:monospace;font-weight:700">ERROR 0x80004005: AUTH_FAIL (code 401)</div><span class="mb" style="background:#e5e7eb">OK</span>`},
  {q:'Which menu is easier to tap on a phone?', why:'Tap targets should be fingertip-sized, labeled, and spaced apart.',
   good:`<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${['🏠 Home','📚 Modules','🗓️ Schedule','👤 Profile'].map(x=>`<span class="mb" style="background:#e0e7ff;padding:18px 6px">${x}</span>`).join('')}</div>`,
   bad:`<div style="display:flex;gap:1px;justify-content:center;font-size:.7rem">${['🏠','📚','🗓️','👤','⚙️','🔔','💬','❓','📤','🗑️'].map(x=>`<span style="padding:1px">${x}</span>`).join('')}</div>`},
  {q:'Which page looks more professional?', why:'Consistent fonts and colors make an app look trustworthy.',
   good:`<div style="font-size:1.3rem;font-weight:800;color:#1e3a8a">Science Fair 2026</div><div style="color:#374151">Join us on March 5 at the school gym. Bring your best project!</div><span class="mb" style="background:#1e3a8a;color:#fff">Register Now</span>`,
   bad:`<div style="font-size:1.4rem;font-family:Impact,fantasy;color:#ef4444">Science Fair 2026</div><div style="font-family:'Comic Sans MS',cursive;color:#16a34a">Join us on March 5 at the <span style="font-family:Times New Roman,serif;color:#a855f7">school gym</span>. Bring your best project!</div><span class="mb" style="background:#facc15;color:#ec4899;font-family:Courier New,monospace">Register Now</span>`},
  {q:'Which product card shows what matters most?', why:'Visual hierarchy: the most important info should stand out.',
   good:`<div style="font-size:2.4rem;text-align:center">🎧</div><div style="font-size:1.2rem;font-weight:800">Wireless Earbuds</div><div style="font-size:1.6rem;font-weight:900;color:#16a34a">₱899</div><div style="font-size:.8rem;color:#6b7280">⭐ 4.8 · 2k sold</div><span class="mb" style="background:#16a34a;color:#fff">Add to Cart</span>`,
   bad:`<div style="font-size:.9rem;text-align:center">🎧</div><div style="font-size:.9rem">Wireless Earbuds</div><div style="font-size:.9rem">₱899</div><div style="font-size:.9rem">⭐ 4.8 · 2k sold</div><div style="font-size:.9rem;text-decoration:underline">Add to Cart</div>`},
  {q:'Which search bar is easier to use?', why:'An icon and a hint (placeholder) tell users what they can type.',
   good:`<div style="font-weight:800">Learning Modules</div><div class="mi" style="border:2px solid #2563eb;color:#6b7280">🔍 Search modules, e.g. "Gen Math"</div><div style="font-size:.85rem;color:#6b7280">Popular: Earth Science · Oral Comm · PE</div>`,
   bad:`<div style="font-weight:800">Learning Modules</div><div style="display:flex;gap:6px;align-items:center"><div class="mi" style="flex:1;height:38px"></div><span style="font-size:.7rem;color:#2563eb">go</span></div>`},
  {q:'Which sign-up form will more students finish?', why:'Only ask for what you really need. Long forms make users give up.',
   good:`<div style="font-weight:800;font-size:1.1rem">Create account</div><div class="mi">Full name</div><div class="mi">Email</div><div class="mi">Password</div><span class="mb" style="background:#2563eb;color:#fff">Sign Up</span>`,
   bad:`<div style="font-weight:800;font-size:1.1rem">Create account</div>${['Full name','Email','Password','Fax number','Blood type','Mother\'s maiden name','Favorite color','Height (cm)'].map(x=>`<div class="mi" style="padding:4px 8px;font-size:.8rem">${x}</div>`).join('')}<span class="mb" style="background:#2563eb;color:#fff">Sign Up</span>`},
  {q:'Which loading screen is better?', why:'Show progress so users know the app is working and how long to wait.',
   good:`<div style="font-weight:800">Uploading your project…</div><div style="height:14px;background:#e5e7eb;border-radius:99px;overflow:hidden"><div style="width:60%;height:100%;background:#2563eb"></div></div><div style="color:#4b5563;font-size:.9rem">60% · about 10 seconds left</div>`,
   bad:`<div style="text-align:center;color:#9ca3af">Please wait...</div>`},
  {q:'Which notification is more useful?', why:'Good notifications tell you what happened without opening the app.',
   good:`<div style="background:#f3f4f6;border-radius:12px;padding:12px"><div style="font-size:.75rem;color:#6b7280">GOOGLE CLASSROOM · now</div><div style="font-weight:800">📚 Ms. Reyes posted "Problem Set 4"</div><div style="font-size:.9rem">Gen Math 11 · Due Friday, 11:59 PM</div></div>`,
   bad:`<div style="background:#f3f4f6;border-radius:12px;padding:12px"><div style="font-size:.75rem;color:#6b7280">APP · now</div><div style="font-weight:800">You have a new notification.</div></div>`},
  {q:'Which "Delete Account" pop-up uses colors correctly?', why:'Colors have meaning: red warns of danger, gray or neutral is the safe choice.',
   good:`<div style="font-weight:800;font-size:1.1rem">Delete your account?</div><div style="color:#4b5563">All your files will be lost.</div><div style="display:flex;gap:8px"><span class="mb" style="flex:1;background:#e5e7eb">Cancel</span><span class="mb" style="flex:1;background:#dc2626;color:#fff">Delete Account</span></div>`,
   bad:`<div style="font-weight:800;font-size:1.1rem">Delete your account?</div><div style="color:#4b5563">All your files will be lost.</div><div style="display:flex;gap:8px"><span class="mb" style="flex:1;background:#dc2626;color:#fff">Cancel</span><span class="mb" style="flex:1;background:#16a34a;color:#fff">Delete Account</span></div>`},
  {q:'Which announcement is easier to read on a phone?', why:'Headings, short lines, and bullets are easier to scan than a wall of text.',
   good:`<div style="font-weight:800;font-size:1.15rem">📢 Career Fair Tomorrow!</div><ul style="margin:0;padding-left:20px"><li>🕗 8:00 AM – 3:00 PM</li><li>📍 School Gym</li><li>🎒 Bring your ID</li></ul>`,
   bad:`<div style="font-size:.8rem;text-align:justify">ANNOUNCEMENT please be informed that the career fair will be held tomorrow at the school gym starting 8:00 in the morning until 3:00 in the afternoon and all students are required to bring their school ID upon entry and please be on time thank you and see you there everyone.</div>`}
];

/* ---------------- helpers ---------------- */
const app = document.getElementById('app');
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const shuffle = a => { a=[...a]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
const pick = a => a[Math.floor(Math.random()*a.length)];
const store = {
  get(k, d){ try{ const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
};
CONFIG = Object.assign({}, DEFAULTS, store.get('tcb_settings', {}));
let screen = 'home', cleanup = null, lastInput = Date.now();
function render(name, html){
  if(cleanup){ cleanup(); cleanup=null; }
  stopAttract(); $$('.modal, canvas.confetti').forEach(m=>m.remove());
  screen = name; app.innerHTML = html; window.scrollTo(0,0);
}

/* ---------------- sound ---------------- */
const SFX = {
  ctx:null, muted: store.get('tcb_muted', false),
  unlock(){
    try{
      this.ctx = this.ctx || new (window.AudioContext||window.webkitAudioContext)();
      if(this.ctx.state !== 'running') this.ctx.resume();
    }catch(e){}
  },
  tone(f, d, type='sine', vol=.15, delay=0){
    if(this.muted) return;
    try{
      this.unlock();
      const t = this.ctx.currentTime + delay, o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.001, t+d);
      o.connect(g); g.connect(this.ctx.destination); o.start(t); o.stop(t+d+.05);
    }catch(e){}
  },
  good(){ this.tone(660,.12); this.tone(990,.2,'sine',.15,.1); },
  bad(){ this.tone(180,.3,'square',.07); },
  click(){ this.tone(520,.06,'sine',.06); },
  win(){ [523,659,784,1046].forEach((f,i)=>this.tone(f,.25,'triangle',.15,i*.13)); },
  start(){ [392,523,659].forEach((f,i)=>this.tone(f,.15,'triangle',.14,i*.1)); },
  tick(){ this.tone(880,.05,'square',.04); },
  hint(){ this.tone(740,.1,'triangle',.1); this.tone(587,.15,'triangle',.1,.1); }
};
const MUSIC = {
  on: store.get('tcb_music', null), timer:null, next:0, step:0, gain:null,
  sync(){ if(this.on===null) this.on = !!CONFIG.musicDefault; (this.on && !SFX.muted) ? this.start() : this.stop(); },
  toggle(){ this.on = !this.on; store.set('tcb_music', this.on); this.sync(); },
  start(){
    if(this.timer) return;
    SFX.unlock(); const ctx = SFX.ctx; if(!ctx) return;
    if(ctx.state !== 'running'){ ctx.resume().then(()=>{ if(this.on && !SFX.muted) this.start(); }).catch(()=>{}); return; }
    this.gain = ctx.createGain(); this.gain.gain.value = 0.05; this.gain.connect(ctx.destination);
    this.next = ctx.currentTime + 0.1; this.step = 0;
    this.timer = setInterval(()=>this.schedule(), 100);
  },
  stop(){
    clearInterval(this.timer); this.timer = null;
    if(this.gain){ const g = this.gain; try{ g.gain.setTargetAtTime(0, SFX.ctx.currentTime, .1); }catch(e){} setTimeout(()=>g.disconnect(), 600); this.gain = null; }
  },
  schedule(){
    const ctx = SFX.ctx, spb = 60/112/2;
    const CH = [[261.63,329.63,392.00],[196.00,246.94,293.66],[220.00,261.63,329.63],[174.61,220.00,261.63]];
    const pat = [0,1,2,1,0,1,2,1];
    while(this.gain && this.next < ctx.currentTime + 0.4){
      const s = this.step % 8, ch = CH[Math.floor(this.step/8) % 4];
      this.note(ch[pat[s]]*2, this.next, spb*0.9, 'triangle', .6);
      if(s===0 || s===4) this.note(ch[0]/2, this.next, spb*1.8, 'sine', 1);
      this.next += spb; this.step++;
    }
  },
  note(f, t, d, type, v){
    const ctx = SFX.ctx, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t+0.02); g.gain.exponentialRampToValueAtTime(0.0001, t+d);
    o.connect(g); g.connect(this.gain); o.start(t); o.stop(t+d+0.05);
  }
};
['pointerdown','keydown','touchstart'].forEach(ev=>addEventListener(ev, ()=>{ SFX.unlock(); MUSIC.sync(); }, {passive:true}));
document.addEventListener('click', e=>{ if(e.target.closest('.btn, .mode-card, .icon-btn, .mp') && !e.target.closest('button[data-a], #check, .hint-btn')) SFX.click(); });

function toast(msg, kind='good', ms=1800){
  $$('.toast').forEach(t=>t.remove());
  const t = document.createElement('div'); t.className = 'toast ' + kind; t.innerHTML = msg;
  document.body.appendChild(t); requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(), 300); }, ms);
}

function makeTimer(total, onTick, onEnd){
  let left = total, last = performance.now();
  const id = setInterval(()=>{
    const now = performance.now(); left -= (now-last)/1000; last = now;
    if(left <= 0){ left = 0; onTick(0,total); clearInterval(id); onEnd(); } else onTick(left,total);
  }, 100);
  return { stop(){ clearInterval(id); }, left(){ return Math.max(0,left); }, add(s){ left = Math.max(0.01, left+s); } };
}

/* ---------------- kiosk / fullscreen ---------------- */
function toggleFullscreen(){
  const d = document.documentElement;
  try{
    if(document.fullscreenElement) document.exitFullscreen();
    else { const p = (d.requestFullscreen || d.webkitRequestFullscreen).call(d); if(p && p.catch) p.catch(()=>toast('Fullscreen is blocked here. Press F11 instead.','info',2500)); }
  }catch(e){ toast('Press F11 for fullscreen.','info'); }
}
const fsLabel = ()=> document.fullscreenElement ? '🗗 Exit Fullscreen' : '⛶ Fullscreen';
document.addEventListener('fullscreenchange', ()=>{ const fb = $('#fs-btn'); if(fb) fb.textContent = fsLabel(); document.body.classList.toggle('kiosk', !!document.fullscreenElement); });
document.addEventListener('contextmenu', e=>{ if(document.fullscreenElement) e.preventDefault(); });
addEventListener('keydown', e=>{ if(document.fullscreenElement && (e.key==='F5' || (e.ctrlKey && ['r','p','s','u'].includes(e.key.toLowerCase())))) e.preventDefault(); });

/* ---------------- layout ---------------- */
function brandBar(){
  return `<header class="brand"><img class="logo" src="logo.png" alt="St. Jude College School of Computer Studies"><div><h1>${esc(CONFIG.boothTitle)}</h1><p>${esc(CONFIG.courseName)}</p></div><div class="spacer"></div>
    <button class="icon-btn" id="mute" title="Sound on/off (music + effects)">${SFX.muted?'🔇':'🔊'}</button>
    <button class="icon-btn" id="fs-btn" title="Fullscreen (kiosk mode)">${fsLabel()}</button>
    ${screen==='home'?'<button class="icon-btn" id="set-btn" title="Settings (admin)">⚙</button>':'<button class="icon-btn" id="home-btn">🏠 Home</button>'}</header>`;
}
function bindBrand(){
  const m = $('#mute'); if(m) m.onclick = ()=>{ SFX.muted=!SFX.muted; store.set('tcb_muted',SFX.muted); m.textContent = SFX.muted?'🔇':'🔊'; MUSIC.sync(); };
  const sb = $('#set-btn'); if(sb) sb.onclick = ()=>{ if(askPin()) renderSettings(); };
  const fb = $('#fs-btn'); if(fb) fb.onclick = toggleFullscreen;
  const h = $('#home-btn'); if(h) h.onclick = ()=>{ if(screen.startsWith('level') && !confirm('Quit the game and go back Home?')) return; renderHome(); };
}
function page(name, inner){ screen = name; render(name, brandBar() + inner); bindBrand(); }
function askPin(msg){ const p = prompt(msg || 'Enter admin PIN:'); if(p === null) return false; if(p !== String(CONFIG.adminPin)){ toast('Wrong PIN','bad'); return false; } return true; }

/* ---------------- leaderboard ---------------- */
const getScores = () => store.get('tcb_scores', []);
function sortedScores(){ return getScores().slice().sort((a,b)=> b.score-a.score || a.ts-b.ts); }
const modeTag = m => m==='hard' ? '<span class="tag hard">HARD</span>' : m==='easy' ? '<span class="tag easy">EASY</span>' : '';
function boardTable(limit, highlightTs){
  const s = sortedScores().slice(0, limit);
  if(!s.length) return `<p class="muted center">No scores yet. Be the first! 🚀</p>`;
  return `<table class="board"><thead><tr><th>#</th><th>Name</th><th>Strand</th><th>Difficulty</th><th>Best Fit</th><th class="score">Score</th></tr></thead><tbody>${
    s.map((r,i)=>`<tr class="${r.ts===highlightTs?'me':''}"><td class="rank medal-${i+1}">${i<3?['🥇','🥈','🥉'][i]:i+1}</td><td>${esc(r.name)}</td><td>${esc(r.strand||'')}</td><td>${modeTag(r.mode)}</td><td>${CAREERS[r.career]?CAREERS[r.career].icon+' '+esc(CAREERS[r.career].name):''}</td><td class="score">${r.score}</td></tr>`).join('')
  }</tbody></table>`;
}
function tallyBars(){
  const t = store.get('tcb_quiz_tally', {}); const entries = Object.keys(CAREERS).map(k=>[k, t[k]||0]).sort((a,b)=>b[1]-a[1]);
  const total = entries.reduce((s,e)=>s+e[1],0);
  if(!total) return `<p class="muted">No quiz results yet.</p>`;
  return `<div class="bars">${entries.map(([k,v])=>`<div class="bar-row"><span>${CAREERS[k].icon} ${CAREERS[k].name}</span><div class="track"><div class="fill" style="width:${Math.round(v/entries[0][1]*100)}%"></div></div><span class="val">${v}</span></div>`).join('')}</div><p class="muted">${total} students took the quiz</p>`;
}

/* ---------------- home ---------------- */
function renderHome(){
  screen = 'home';
  page('home', `
    <section class="hero fade-in"><h2>${esc(CONFIG.tagline)}</h2><p class="lead">Pick an activity to start.</p></section>
    <div class="mode-grid fade-in">
      <button class="mode-card" id="go-quiz"><span class="mode-icon">🧭</span><h3>What's Your Tech Career?</h3><p class="muted">Answer 10 quick questions and find the tech career that fits you best.</p><span class="pill">~1 minute · Career Card</span></button>
      <button class="mode-card" id="go-game"><span class="mode-icon">🕹️</span><h3>A Day in the Life</h3><p class="muted">Choose at least 5 of ${LEVELS.length} career mini-games. Beat the clock and top the leaderboard!</p><span class="pill">~5 minutes · Easy / Hard · Leaderboard</span></button>
    </div>
    <div class="card home-board fade-in"><div class="row" style="justify-content:space-between"><h3>🏆 Top Players</h3><button class="btn small" id="go-board">View full leaderboard</button></div>${boardTable(5)}</div>
  `);
  $('#go-quiz').onclick = startQuiz;
  $('#go-game').onclick = renderNameEntry;
  $('#go-board').onclick = renderBoard;
}

/* ---------------- career card ---------------- */
function careerCard(key, headline){
  const c = CAREERS[key];
  return `<div class="career-card fade-in">
    <div class="cc-top"><div class="cc-icon">${c.icon}</div><div><p class="eyebrow">${headline}</p><h2>${c.name}</h2><p class="lead" style="margin:0">${c.desc}</p></div></div>
    <div class="cc-grid">
      <div><h4>A day at work</h4><p style="margin:0">${c.day}</p></div>
      <div><h4>Skills you'll need</h4><ul>${c.skills.map(s=>`<li>${s}</li>`).join('')}</ul></div>
      <div><h4>Possible jobs</h4><ul>${c.jobs.map(s=>`<li>${s}</li>`).join('')}</ul></div>
    </div>
    <div class="cc-path">🎓 Start your path: take <b>${esc(CONFIG.courseName)}</b>!</div>
  </div>`;
}

/* ---------------- shareable career card (image) ---------------- */
function roundRect(x,a,b,w,h,r){ x.beginPath(); x.moveTo(a+r,b); x.arcTo(a+w,b,a+w,b+h,r); x.arcTo(a+w,b+h,a,b+h,r); x.arcTo(a,b+h,a,b,r); x.arcTo(a,b,a+w,b,r); x.closePath(); }
function wrapText(x, t, cx, y, maxW, lh){
  const words = String(t).split(' '), lines = []; let line = '';
  words.forEach(w=>{ const test = line ? line+' '+w : w; if(x.measureText(test).width > maxW && line){ lines.push(line); line = w; } else line = test; });
  lines.push(line); lines.forEach((l,i)=>x.fillText(l, cx, y+i*lh)); return lines.length;
}
function drawShareCard(o){
  const c = CAREERS[o.career], W = 1080, H = 1350, cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const x = cv.getContext('2d'), SANS = 'system-ui, "Segoe UI", Roboto, Arial, sans-serif';
  const g = x.createLinearGradient(0,0,W,H); g.addColorStop(0,'#0f4a2a'); g.addColorStop(1,'#04140c'); x.fillStyle = g; x.fillRect(0,0,W,H);
  x.globalAlpha = .07; x.fillStyle = '#fff'; x.font = 'bold 56px monospace';
  for(let i=0;i<36;i++) x.fillText(pick(['</>','{ }','01','=>','();','[ ]','if','#']), Math.random()*W, Math.random()*H);
  x.globalAlpha = 1; x.strokeStyle = '#4ade80'; x.lineWidth = 6; roundRect(x,40,40,W-80,H-80,48); x.stroke();
  x.textAlign = 'center';
  x.fillStyle = '#4ade80'; x.font = `bold 40px ${SANS}`; x.fillText(CONFIG.boothTitle.toUpperCase(), W/2, 140);
  x.font = '210px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif'; x.fillText(c.icon, W/2, 420);
  x.fillStyle = '#d3ecdc'; x.font = `44px ${SANS}`; x.fillText(o.name ? `${o.name}'s future tech career:` : 'My future tech career:', W/2, 530);
  x.fillStyle = '#ffffff'; x.font = `bold 86px ${SANS}`; let y = 640; y += (wrapText(x, c.name, W/2, y, W-180, 98)-1)*98;
  const gg = x.createLinearGradient(200,0,W-200,0); gg.addColorStop(0,'#4ade80'); gg.addColorStop(1,'#facc15');
  x.fillStyle = gg; x.font = `900 72px ${SANS}`; y += 140; x.fillText(o.line1, W/2, y);
  x.fillStyle = '#a3c9b2'; x.font = `38px ${SANS}`; y += 80; y += (wrapText(x, o.line2, W/2, y, W-200, 50)-1)*50;
  x.fillStyle = '#effaf3'; x.font = `34px ${SANS}`; y += 100; wrapText(x, 'Skills: ' + c.skills.join(' · '), W/2, y, W-200, 46);
  x.fillStyle = '#4ade80'; x.font = `bold 42px ${SANS}`; x.fillText('🎓 ' + CONFIG.courseName, W/2, H-150);
  x.fillStyle = '#a3c9b2'; x.font = `30px ${SANS}`; x.fillText(new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'}), W/2, H-95);
  return cv.toDataURL('image/png');
}
function openCardModal(o){
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="modal-box"><h2>📸 Your Career Card</h2>
    ${o.askName?`<label class="lbl">Name on card (optional)<input class="text" id="card-name" maxlength="16" autocomplete="off" placeholder="e.g. Juan"></label>`:''}
    <img id="card-img" alt="Career card">
    <div class="row center" style="margin-top:14px"><a class="btn primary big" id="card-dl" download="my-tech-career.png">⬇ Download</a><button class="btn big" id="card-close">Close</button></div>
    <p class="muted center" style="margin:10px 0 0">Tip: take a photo of the screen and post it! 📱</p></div>`;
  document.body.appendChild(m);
  const draw = ()=>{ const url = drawShareCard(Object.assign({}, o, {name: o.askName ? $('#card-name',m).value.trim() : o.name})); $('#card-img',m).src = url; $('#card-dl',m).href = url; };
  draw(); if(o.askName) $('#card-name',m).oninput = draw;
  $('#card-close',m).onclick = ()=>m.remove(); m.onclick = e=>{ if(e.target===m) m.remove(); };
}

/* ---------------- confetti ---------------- */
function confetti(big){
  const cv = document.createElement('canvas'); cv.className = 'confetti'; cv.width = innerWidth; cv.height = innerHeight; document.body.appendChild(cv);
  const ctx = cv.getContext('2d'), colors = ['#4ade80','#facc15','#22c55e','#f59e0b','#ef4444','#fbbf24','#ffffff'];
  const P = Array.from({length: big?260:140}, ()=>({x:Math.random()*cv.width, y:-20-Math.random()*cv.height*.6, vx:(Math.random()-.5)*4, vy:2+Math.random()*4, r:Math.random()*Math.PI, vr:(Math.random()-.5)*.3, w:6+Math.random()*8, h:8+Math.random()*10, c:pick(colors)}));
  const end = performance.now() + (big?5500:3800);
  (function frame(){
    ctx.clearRect(0,0,cv.width,cv.height);
    P.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; p.vy+=.03; p.r+=p.vr; ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.r); ctx.fillStyle=p.c; ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h); ctx.restore(); });
    if(performance.now() < end) requestAnimationFrame(frame); else cv.remove();
  })();
}

/* ---------------- quiz ---------------- */
function startQuiz(){
  const pts = {}; Object.keys(CAREERS).forEach(k=>pts[k]=0);
  const history = []; let i = 0;
  function show(){
    if(i >= QUIZ.length) return quizResult(pts);
    const Q = QUIZ[i];
    page('quiz', `<div class="fade-in">
      <p class="center muted" style="margin:0">Question ${i+1} of ${QUIZ.length}</p>
      <div class="progress"><div style="width:${i/QUIZ.length*100}%"></div></div>
      <h2 class="q-title">${Q.q}</h2>
      <div class="opt-grid">${Q.o.map((o,j)=>`<button class="opt" data-j="${j}"><span class="em">${o[0]}</span><span>${o[1]}</span></button>`).join('')}</div>
      <div class="row center" style="margin-top:22px">${i>0?'<button class="btn small" id="back">← Back</button>':''}</div>
    </div>`);
    $$('.opt').forEach(b=>b.onclick=()=>{ SFX.click(); history.push(+b.dataset.j); Q.o[+b.dataset.j][2].forEach(k=>pts[k]++); i++; show(); });
    const bk = $('#back'); if(bk) bk.onclick = ()=>{ i--; const j = history.pop(); QUIZ[i].o[j][2].forEach(k=>pts[k]--); show(); };
  }
  show();
}
function quizResult(pts){
  const max = {}; Object.keys(CAREERS).forEach(k=>max[k]=0);
  QUIZ.forEach(Q=>{ const seen = new Set(); Q.o.forEach(o=>o[2].forEach(k=>seen.add(k))); seen.forEach(k=>max[k]++); });
  const ranked = Object.keys(CAREERS).map(k=>({k, pct: Math.round(pts[k]/max[k]*100), raw: pts[k]})).sort((a,b)=> b.pct-a.pct || b.raw-a.raw);
  const top = ranked[0].k;
  const tally = store.get('tcb_quiz_tally', {}); tally[top] = (tally[top]||0)+1; store.set('tcb_quiz_tally', tally);
  SFX.win(); confetti(false);
  page('quiz-result', `
    <p class="center eyebrow" style="font-size:1rem">Your result</p>
    ${careerCard(top, 'Your best-match tech career')}
    <div class="card"><h3>Your top 3 matches</h3><div class="bars">${ranked.slice(0,3).map(r=>`<div class="bar-row"><span>${CAREERS[r.k].icon} ${CAREERS[r.k].name}</span><div class="track"><div class="fill" data-w="${r.pct}"></div></div><span class="val">${r.pct}%</span></div>`).join('')}</div></div>
    <div class="row center" style="margin-top:22px">
      <button class="btn primary big" id="card-btn">📸 Get My Career Card</button>
      <button class="btn big" id="try-game">🕹️ Test it: Play "A Day in the Life"</button>
      <button class="btn big" id="home2">🏠 Home</button>
    </div>`);
  setTimeout(()=>$$('.fill[data-w]').forEach(f=>f.style.width=f.dataset.w+'%'), 50);
  $('#card-btn').onclick = ()=> openCardModal({askName:true, career:top, line1:`${ranked[0].pct}% match`, line2:`Also a match: ${CAREERS[ranked[1].k].name} · ${CAREERS[ranked[2].k].name}`});
  $('#try-game').onclick = renderNameEntry; $('#home2').onclick = renderHome;
}

/* ---------------- game ---------------- */
let game = null, lastMode = 'easy';
const isHard = () => !!game && game.mode === 'hard';
const qaPenalty = () => isHard() ? 5 : 3;
function renderNameEntry(){
  page('name', `<div class="card narrow fade-in" style="max-width:820px">
    <p class="eyebrow">A Day in the Life</p><h2>Who's playing?</h2>
    <p class="muted">Explore 8 tech careers through 9 mini-games (Software / Web Development has an extra debugging challenge). Choose at least 5, or try them all.</p>
    <label class="lbl" for="pname">Name / Nickname</label><input class="text" id="pname" maxlength="16" autocomplete="off" placeholder="e.g. Juan">
    <label class="lbl" for="pstrand">SHS Strand</label><select class="text" id="pstrand">${CONFIG.strands.map(s=>`<option>${esc(s)}</option>`).join('')}</select>
    <label class="lbl">Difficulty</label>
    <div class="mode-pick">
      <button type="button" class="mp" data-m="easy"><b>😊 Easy</b><small>More time · normal points</small></button>
      <button type="button" class="mp" data-m="hard"><b>🔥 Hard</b><small>Less time · ×1.5 points</small></button>
    </div>
    <div class="row" style="justify-content:space-between;margin-top:22px;align-items:center"><h3 style="margin:0">Choose your mini-games</h3><button type="button" class="btn small" id="select-all">Select all</button></div>
    <div class="career-pick-grid">${LEVELS.map((l,i)=>`<label class="career-pick"><input type="checkbox" class="career-choice" value="${i}" checked><span>${CAREERS[l.career].icon}</span><span><b>${esc(l.title)}</b><small>${esc(CAREERS[l.career].desc)}</small></span></label>`).join('')}</div>
    <p class="muted" id="pick-count">9 of 9 selected · Minimum 5</p>
    <div class="row" style="margin-top:22px"><button class="btn primary big" id="go">Let's Go! →</button></div>
  </div>`);
  let mode = lastMode;
  const paint = ()=> $$('.mp').forEach(b=>b.classList.toggle('sel', b.dataset.m===mode));
  $$('.mp').forEach(b=>b.onclick=()=>{ mode = b.dataset.m; paint(); }); paint();
  const choices = $$('.career-choice');
  const updatePicks = ()=>{
    const count = choices.filter(x=>x.checked).length;
    $('#pick-count').textContent = `${count} of ${LEVELS.length} selected · Minimum 5`;
    $('#pick-count').style.color = count < 5 ? 'var(--bad)' : 'var(--muted)';
    $('#select-all').textContent = count===LEVELS.length ? 'Clear all' : 'Select all';
  };
  choices.forEach(x=>x.onchange=updatePicks);
  $('#select-all').onclick=()=>{ const all=choices.every(x=>x.checked); choices.forEach(x=>x.checked=!all); updatePicks(); };
  updatePicks();
  const inp = $('#pname'); inp.focus();
  const go = ()=>{
    const n = inp.value.trim(), selected = choices.filter(x=>x.checked).map(x=>LEVELS[Number(x.value)]);
    if(!n){ inp.focus(); toast('Please enter your name first 🙂','info'); return; }
    if(selected.length<5){ toast('Please choose at least 5 career mini-games.','info',2600); return; }
    lastMode = mode; game = {name:n, strand:$('#pstrand').value, mode, levels:selected, results:[]}; runLevel(0);
  };
  $('#go').onclick = go; inp.onkeydown = e=>{ if(e.key==='Enter') go(); };
}

const LEVELS = [
  {career:'cyber', title:'Cybersecurity Analyst', task:()=>`Messages are coming in! Mark each one as <b>✅ Legit</b> or <b>🚩 Phishing</b> (scam). Read carefully: scammers hide clues in links and sender names.`, play:playPhish},
  {career:'dev', title:'Web Developer', task:()=>`The designer sent a target design. Change the <b>CSS code</b> so <b>Your Output</b> looks exactly like the <b>Target Design</b>, then press <b>Run & Check</b>.`, play:playWeb},
  {career:'qa', title:'QA Tester', task:()=>`A new app screen is about to launch, but it has <b>5 hidden bugs</b>. Click on everything that looks wrong. Careful: wrong clicks cost <b>${qaPenalty()} seconds</b>!`, play:playQA},
  {career:'data', title:'Data Analyst', task:()=>`Your boss needs answers from this week's data. Read the <b>chart</b> and answer <b>${isHard()?7:6} questions</b> as fast as you can.${isHard()?' (Hard: no number labels on the bars!)':''}`, play:playData},
  {career:'uiux', title:'UI/UX Designer', task:()=>`Two designs, one choice! For each round, pick the design that is <b>better for users</b>.`, play:playUX},
  {career:'game', title:'Game Developer', task:()=>`A client sent you a <b>brief</b> for a new game. Change the <b>game code</b> (tap <b>−</b> and <b>+</b>) until the game matches the brief, watch the <b>live preview</b>, then press <b>Run & Check</b>.`, play:playGame},
  {career:'ai', title:'AI / Machine Learning Engineer', task:()=>`Teach a simple AI by labeling examples. Choose the correct category, then see what the model learned and where it can make mistakes.`, play:playAI},
  {career:'network', title:'Network & Cloud Engineer', task:()=>`Troubleshoot a small office network. Identify which device is offline and choose the right fix to reconnect it.`, play:playNetwork},
  {career:'dev', title:'Debug the Code', task:()=>`A program has one bug in each short code sample. Find the incorrect line and choose the corrected version.`, play:playDebug}
];
function playAI(body, api){
  const samples=[
    {item:'📧 “You won a prize! Click this unknown link now.”',opts:['Spam / suspicious','Safe message'],a:0,why:'Unexpected prizes and unknown links are common warning signs.'},
    {item:'🐱 A photo of a cat',opts:['Dog','Cat'],a:1,why:'The label should match the animal shown.'},
    {item:'📩 “Your class schedule is posted in the official school portal.”',opts:['Spam / suspicious','Normal update'],a:1,why:'This is a routine update that directs you to the official portal.'},
    {item:'🐶 A photo of a dog',opts:['Cat','Dog'],a:1,why:'The correct training label is Dog.'},
    {item:'🔐 “Send me your OTP so I can verify your account.”',opts:['Safe request','Suspicious request'],a:1,why:'Never share an OTP. A real service should not ask you to send it.'},
    {item:'🐈 A photo of a kitten',opts:['Cat','Bird'],a:0,why:'A kitten is still a cat.'},
    {item:'📧 “Your package is delayed. Pay a small fee using this unfamiliar link.”',opts:['Normal delivery update','Suspicious message'],a:1,why:'Unexpected payment requests through unfamiliar links are a warning sign.'},
    {item:'🐦 A photo of a parrot',opts:['Bird','Cat'],a:0,why:'A parrot is a type of bird.'},
    {item:'🏫 “Reminder: classes start at 7:30 AM tomorrow.”',opts:['Normal announcement','Spam'],a:0,why:'A clear school reminder from an expected source is a normal announcement.'},
    {item:'🔑 “Reply with your password to avoid account suspension.”',opts:['Safe request','Suspicious request'],a:1,why:'Legitimate services should not ask you to send your password in a message.'},
    {item:'🐕 A photo of a golden retriever',opts:['Dog','Rabbit'],a:0,why:'A golden retriever is a dog.'},
    {item:'🎁 “You were selected! Claim your reward by sharing your bank details.”',opts:['Legitimate offer','Suspicious message'],a:1,why:'Requests for sensitive financial details to claim unexpected prizes are suspicious.'},
    {item:'🐠 A photo of a goldfish',opts:['Bird','Fish'],a:1,why:'The visible animal belongs to the fish category.'},
    {item:'📨 “Your teacher uploaded a module to the official learning portal.”',opts:['Normal update','Spam'],a:0,why:'The message points to an expected official learning platform.'},
    {item:'📱 “Install this unknown app to receive a guaranteed cash reward.”',opts:['Safe promotion','Suspicious message'],a:1,why:'Unknown apps and guaranteed rewards can be used to trick users.'},
    {item:'🐰 A photo of a rabbit',opts:['Rabbit','Dog'],a:0,why:'The correct label is Rabbit.'},
    {item:'📅 “Your appointment is confirmed. View it in the app you already use.”',opts:['Routine notification','Spam'],a:0,why:'A notification about an expected appointment in a familiar app is routine.'},
    {item:'🔒 “Your account will close in 5 minutes. Send your OTP now.”',opts:['Urgent safe request','Suspicious request'],a:1,why:'Urgency and OTP requests are common social-engineering warning signs.'},
    {item:'🐢 A photo of a turtle',opts:['Turtle','Cat'],a:0,why:'The correct training label is Turtle.'}
  ];
  const selected=shuffle(samples).slice(0,6);
  let i=0, correct=0;
  api.setTotal(selected.length);
  function show(){
    const x=selected[i];
    body.innerHTML=`<div class="card center"><p class="eyebrow">Training example ${i+1}/${selected.length}</p><h2>What label should the AI learn?</h2><div class="ai-sample">${x.item}</div><div class="opt-grid compact">${x.opts.map((o,j)=>`<button class="opt" data-ai="${j}">${o}</button>`).join('')}</div><p class="muted" id="ai-feedback">Choose the best label.</p></div>`;
    $$('[data-ai]',body).forEach(b=>b.onclick=()=>{
      if(api.finished || body.dataset.answered==='1')return; body.dataset.answered='1';
      const ok=Number(b.dataset.ai)===x.a; if(ok){correct++;api.good('Correct label!');}else api.bad('Not quite.');
      $$('[data-ai]',body).forEach((el,j)=>{el.disabled=true;if(j===x.a)el.classList.add('right');else if(j===Number(b.dataset.ai))el.classList.add('wrong');});
      $('#ai-feedback',body).innerHTML=`<b>${ok?'Good training data!':'The correct label is: '+x.opts[x.a]}</b><br>${x.why}`;
      api.later(()=>{i++;if(i<selected.length){body.dataset.answered='0';show();}else api.done();},1250);
    });
  } show();
  api.setHint(()=>`Look for the item's key clue: sender, request, or visible animal.`);
}
function playNetwork(body, api){
  const rounds=[
    {q:'The desktop cannot access the internet. Its network cable is unplugged.',opts:['Reconnect the Ethernet cable','Change the monitor','Restart the keyboard'],a:0,why:'A wired computer needs its Ethernet cable connected to the router or switch.'},
    {q:'The Wi-Fi router has power, but no device can connect.',opts:['Check the router connection and status','Unplug every computer','Replace the mouse'],a:0,why:'Check the router and its internet connection before changing unrelated devices.'},
    {q:'One computer is offline while other computers work normally.',opts:['Check that computer’s cable or Wi-Fi','Turn off the whole network','Change all passwords'],a:0,why:'If only one device is affected, troubleshoot that device first.'},
    {q:'A network printer is not reachable by any user.',opts:['Check printer power and network connection','Increase screen brightness','Clear browser history'],a:0,why:'The printer must be powered on and connected to the same network.'},
    {q:'A switch is not receiving power.',opts:['Check its power adapter and outlet','Replace the HDMI cable','Update the wallpaper'],a:0,why:'A network switch needs power to connect wired devices.'},
    {q:'A laptop connects to Wi-Fi but cannot open any website. Other devices work.',opts:['Check the laptop network settings and DNS','Replace the office printer','Turn off every access point'],a:0,why:'Because other devices work, start by checking the affected laptop settings.'},
    {q:'All wired computers in one room lose connection, but Wi-Fi still works.',opts:['Check the room switch and its uplink cable','Change each computer wallpaper','Reset every user password'],a:0,why:'A shared switch or its uplink can affect several wired devices at once.'},
    {q:'A user is connected to the guest Wi-Fi but cannot access an internal file server.',opts:['Connect to the authorized staff network or VPN','Replace the laptop screen','Disable the firewall permanently'],a:0,why:'Guest networks are commonly separated from internal company resources.'},
    {q:'The network is slow only when many people join the same Wi-Fi access point.',opts:['Check access-point capacity and interference','Replace the keyboard batteries','Delete files from every laptop'],a:0,why:'Too many clients or wireless interference can reduce Wi-Fi performance.'},
    {q:'A computer has no link light on its Ethernet port.',opts:['Check the cable, port, and switch connection','Change the browser homepage','Increase speaker volume'],a:0,why:'A missing link light often points to a physical cable, port, or switch issue.'},
    {q:'A device receives an IP address beginning with 169.254.',opts:['Check DHCP availability and network connection','Change the monitor resolution','Install a new font'],a:0,why:'A 169.254 address can appear when a device cannot reach a DHCP server.'},
    {q:'Users can reach a website by IP address but not by its domain name.',opts:['Check DNS settings and DNS service','Replace the Ethernet cable on every device','Restart the projector'],a:0,why:'DNS translates domain names into IP addresses.'},
    {q:'A new computer cannot join the secured office Wi-Fi.',opts:['Verify the network name and approved credentials','Disable Wi-Fi security for everyone','Change the computer date format'],a:0,why:'Confirm the correct SSID and authorized credentials first.'},
    {q:'A cloud-hosted application is unavailable to everyone, but the office internet works.',opts:['Check the cloud service status and application alerts','Replace the office router immediately','Unplug all desktop computers'],a:0,why:'If general internet access works, investigate the hosted service itself.'},
    {q:'Only one network port on a switch appears inactive.',opts:['Test the port and its cable, then check port status','Replace the entire network','Change all device usernames'],a:0,why:'A single inactive port suggests a localized port or cable issue.'},
    {q:'A user can access internal sites but not external websites.',opts:['Check gateway, firewall, and internet routing','Replace the mouse','Clear the desktop icons'],a:0,why:'The gateway, firewall, or upstream route may be affecting external traffic.'}
  ];
  const selected=shuffle(rounds).slice(0,5);
  let i=0;api.setTotal(selected.length);
  function show(){const x=selected[i], choices=shuffle(x.opts.map((label,j)=>({label,correct:j===x.a})));body.innerHTML=`<div class="card center"><p class="eyebrow">Network issue ${i+1}/${selected.length}</p><div class="network-map">💻 <span>→</span> 🔀 <span>→</span> 🌐</div><h2>${x.q}</h2><div class="opt-grid compact">${choices.map((o,j)=>`<button class="opt" data-net="${j}">${o.label}</button>`).join('')}</div><p class="muted" id="net-feedback">Choose the best troubleshooting step.</p></div>`;
    $$('[data-net]',body).forEach(b=>b.onclick=()=>{if(api.finished||body.dataset.answered==='1')return;body.dataset.answered='1';const chosen=choices[Number(b.dataset.net)],ok=chosen.correct;if(ok)api.good('Connection restored!');else api.bad('That will not fix this issue.');$$('[data-net]',body).forEach((el,j)=>{el.disabled=true;if(choices[j].correct)el.classList.add('right');else if(j===Number(b.dataset.net))el.classList.add('wrong');});$('#net-feedback',body).innerHTML=`<b>${ok?'Correct fix!':'Best fix: '+x.opts[x.a]}</b><br>${x.why}`;api.later(()=>{i++;if(i<selected.length){body.dataset.answered='0';show();}else api.done();},1250);});}
  show();api.setHint(()=>`Start with the device or connection mentioned in the problem. Avoid changing unrelated equipment.`);
}
function playDebug(body, api){
  const tasks=[
    {q:'Display “Hello, world!” in Python.',lines:['print("Hello, world!)','print("Hello, world!")','Print("Hello, world!")'],a:1,why:'The first line is missing a closing quotation mark. Python uses lowercase print.'},
    {q:'Store the number 10 in a variable named score.',lines:['score == 10','score = 10','10 = score'],a:1,why:'A single equals sign assigns a value to a variable.'},
    {q:'Check whether age is at least 18.',lines:['if age >= 18:','if age = 18:','if age => 18:'],a:0,why:'Use >= for “greater than or equal to”.'},
    {q:'Repeat a message three times.',lines:['for i in range(3):','for i in range(2):','for i in range(3)'],a:0,why:'range(3) repeats three times, and a Python for statement needs a colon.'},
    {q:'Join the first and last name with a space.',lines:['full_name = first + " " + last','full_name == first + last','full_name = first - last'],a:0,why:'Use assignment (=) and + to join strings, with a space between them.'},
    {q:'Convert the text value “25” into an integer.',lines:['age = int("25")','age = integer("25")','age = str(25)'],a:0,why:'Python uses int() to convert a numeric string into an integer.'},
    {q:'Check whether a number is even.',lines:['if number % 2 == 0:','if number / 2 == 0:','if number % 2 = 0:'],a:0,why:'The modulo operator (%) checks the remainder; even numbers have remainder zero.'},
    {q:'Create a list containing red, blue, and green.',lines:['colors = ["red", "blue", "green"]','colors = ("red", "blue", "green"','colors = [red, blue, green]'],a:0,why:'A list uses square brackets and text values need quotation marks.'},
    {q:'Define a function named greet.',lines:['function greet():','def greet():','define greet():'],a:1,why:'Python function definitions start with the keyword def and end the header with a colon.'},
    {q:'Get the third item from a Python list named scores.',lines:['scores[3]','scores(2)','scores[2]'],a:2,why:'Python lists use zero-based indexing, so the third item is at index 2.'},
    {q:'Repeat while count is less than 5.',lines:['while count < 5:','while count =< 5:','while (count < 5)'],a:0,why:'Use < for less than, and include the colon after the while condition.'},
    {q:'Add 1 to the current value of total.',lines:['total =+ 1','total += 1','total ==+ 1'],a:1,why:'The += operator adds a value and assigns the result back to the variable.'},
    {q:'Print the first character of the word stored in name.',lines:['print(name[0])','print(name[1])','print(name(0))'],a:0,why:'The first character is at index 0, and strings use square-bracket indexing.'},
    {q:'Write a condition that checks if password is not empty.',lines:['if password != "":','if password =! "":','if password <> "":'],a:0,why:'The != operator means “not equal to” in Python.'},
    {q:'Open a file named notes.txt for reading.',lines:['open("notes.txt", "r")','open("notes.txt", "w")','read("notes.txt")'],a:0,why:'The r mode opens a file for reading; w is for writing.'},
    {q:'Find the number of items in a list named items.',lines:['items.length','len(items)','count(items)'],a:1,why:'Python’s built-in len() function returns the number of items.'}
  ];const selected=shuffle(tasks).slice(0,5);let i=0;api.setTotal(selected.length);
  function show(){const x=selected[i];body.innerHTML=`<div class="card"><p class="eyebrow">Debug challenge ${i+1}/${selected.length}</p><h2>${x.q}</h2><p class="muted">One line is the correct fix. Select it.</p><div class="debug-lines">${x.lines.map((l,j)=>`<button class="debug-line" data-debug="${j}"><b>${j+1}</b><code>${esc(l)}</code></button>`).join('')}</div><p id="debug-feedback" class="muted center">Find the line that works.</p></div>`;
    $$('[data-debug]',body).forEach(b=>b.onclick=()=>{if(api.finished||body.dataset.answered==='1')return;body.dataset.answered='1';const ok=Number(b.dataset.debug)===x.a;if(ok)api.good('Bug fixed!');else api.bad('That line still has a bug.');$$('[data-debug]',body).forEach((el,j)=>{el.disabled=true;if(j===x.a)el.classList.add('right');else if(j===Number(b.dataset.debug))el.classList.add('wrong');});$('#debug-feedback',body).innerHTML=`<b>${ok?'Correct!':'Correct line: '+x.lines[x.a]}</b><br>${x.why}`;api.later(()=>{i++;if(i<selected.length){body.dataset.answered='0';show();}else api.done();},1300);});}
  show();api.setHint(()=>`Check syntax carefully: spelling, quotation marks, operators, and colons.`);
}

const levelSeconds = idx => { const s = CONFIG.levelSeconds[idx] || DEFAULTS.levelSeconds[idx] || 45; return isHard() ? Math.round(s*0.7) : s; };

function runLevel(idx){
  const L = game.levels[idx], c = CAREERS[L.career], secs = levelSeconds(LEVELS.indexOf(L));
  page('level-intro', `<div class="card intro fade-in">
    <div class="intro-icon">${c.icon}</div>
    <p class="eyebrow">Level ${idx+1} of ${game.levels.length} · A Day in the Life · ${isHard()?'🔥 Hard':'😊 Easy'}</p>
    <h2 style="font-size:2rem">Today, you are a ${L.title}</h2>
    <p class="lead">${c.desc}</p>
    <div class="task"><b>Your task:</b> ${L.task()}</div>
    <p class="muted">⏱ You have ${secs} seconds · 💡 Stuck? Use a hint (−${CONFIG.hintCost} points each)</p>
    <button class="btn primary big" id="start">Start Level ${idx+1} →</button>
  </div>`);
  $('#start').onclick = ()=>{
    let finished = false, hintFn = null;
    const prog = {correct:0, total:0, hints:0};
    page('level', `<div class="level-head"><div><span class="lvl-badge">Level ${idx+1}/${game.levels.length}</span><span class="lvl-job">${c.icon} ${L.title}</span></div>
      <div class="hud"><button class="icon-btn hint-btn" id="hint-btn">💡 Hint −${CONFIG.hintCost}</button><span id="hud-c">✔ 0</span><span class="t" id="hud-t">⏱ ${secs}</span></div></div>
      <div class="timer-bar" id="tbar"><div id="tfill"></div></div><div id="lvl-body" class="fade-in"></div>`);
    const tfill = $('#tfill'), tbar = $('#tbar'), ht = $('#hud-t'), hc = $('#hud-c'), hb = $('#hint-btn');
    SFX.start(); let lastTick = Math.ceil(secs);
    const timer = makeTimer(secs, (left,total)=>{
      const sec = Math.ceil(left); if(sec < lastTick){ lastTick = sec; if(sec <= 5 && sec > 0) SFX.tick(); }
      tfill.style.width = (left/total*100)+'%'; ht.textContent = '⏱ ' + sec;
      const low = left <= 10; ht.classList.toggle('low', low); tbar.classList.toggle('low', low);
    }, ()=>finish(true));
    const timers = [];
    cleanup = ()=>{ finished = true; timer.stop(); timers.forEach(clearTimeout); };
    hb.onclick = ()=>{
      if(finished || !hintFn) return;
      const msg = hintFn();
      if(!msg){ toast('No hint available right now.','info'); return; }
      prog.hints++; SFX.hint(); toast('💡 ' + msg, 'info', 4000);
      hb.textContent = `💡 Hint −${CONFIG.hintCost} (used ${prog.hints})`;
    };
    const api = {
      setTotal(n){ prog.total = n; hc.textContent = `✔ ${prog.correct}/${prog.total}`; },
      good(msg, n=1){ prog.correct += n; hc.textContent = `✔ ${prog.correct}/${prog.total}`; SFX.good(); if(msg) toast(msg,'good'); },
      bad(msg){ SFX.bad(); if(msg) toast(msg,'bad'); },
      penalty(s){ timer.add(-s); },
      setHint(fn){ hintFn = fn; },
      later(fn, ms){ timers.push(setTimeout(()=>{ if(!finished) fn(); }, ms)); },
      done(){ finish(false); },
      get finished(){ return finished; }
    };
    function finish(timeout){
      if(finished) return; finished = true; timer.stop(); timers.forEach(clearTimeout); cleanup = null;
      const acc = prog.total ? prog.correct/prog.total : 0;
      const base = Math.round(acc*500), bonus = Math.round(timer.left()*5*acc), hintCost = prog.hints*CONFIG.hintCost;
      const sub = Math.max(0, base + bonus - hintCost), mult = isHard() ? 1.5 : 1, score = Math.round(sub*mult);
      game.results.push({career:L.career, title:L.title, correct:prog.correct, total:prog.total, acc, score});
      timeout ? SFX.bad() : SFX.good();
      page('level-done', `<div class="card intro fade-in">
        <div class="intro-icon">${timeout?'⏰':'🎉'}</div><h2>${timeout?"Time's up!":'Level complete!'}</h2>
        <div class="big-stat">${prog.correct}/${prog.total}</div><p class="muted">correct as a ${L.title}</p>
        <div class="score-lines"><div><span>Accuracy points</span><b>+${base}</b></div><div><span>Time bonus</span><b>+${bonus}</b></div>
          ${prog.hints?`<div><span>Hints used (${prog.hints})</span><b>−${hintCost}</b></div>`:''}
          ${mult>1?`<div><span>🔥 Hard mode</span><b>×1.5</b></div>`:''}
          <div class="tot"><span>Level score</span><span>${score}</span></div></div>
        <div><button class="btn primary big" id="next">${idx < game.levels.length-1 ? 'Next Level →' : '🏁 See My Results'}</button></div>
      </div>`);
      $('#next').onclick = ()=> idx < game.levels.length-1 ? runLevel(idx+1) : gameResult();
    }
    L.play($('#lvl-body'), api);
  };
}

function gameResult(){
  const total = game.results.reduce((s,r)=>s+r.score,0);
  const best = game.results.slice().sort((a,b)=> b.acc-a.acc || b.score-a.score)[0];
  const entry = {name:game.name, strand:game.strand, mode:game.mode, score:total, career:best.career, ts:Date.now()};
  const scores = getScores(); scores.push(entry); store.set('tcb_scores', scores);
  const rank = sortedScores().findIndex(r=>r.ts===entry.ts) + 1;
  SFX.win(); if(rank <= 3) confetti(rank === 1);
  page('game-result', `
    <div class="center fade-in">${rank<=3?`<div class="newtop">🏆 ${rank===1?'NEW #1 HIGH SCORE!':'YOU MADE THE TOP 3!'}</div>`:''}
      <p class="eyebrow" style="font-size:1rem">Great job, ${esc(game.name)}! ${modeTag(game.mode)}</p><div class="big-stat">${total}</div><p class="muted">total points · Rank <b style="color:var(--text)">#${rank}</b> on the leaderboard</p></div>
    <div class="card"><h3>How you did in each job</h3><div class="bars">${game.results.map(r=>`<div class="bar-row"><span>${CAREERS[r.career].icon} ${r.title}</span><div class="track"><div class="fill" data-w="${Math.round(r.acc*100)}"></div></div><span class="val">${r.score}</span></div>`).join('')}</div></div>
    ${careerCard(best.career, 'You performed best as a…')}
    <div class="card"><h3>🏆 Leaderboard</h3>${boardTable(10, entry.ts)}</div>
    <div class="row center" style="margin-top:22px">
      <button class="btn primary big" id="card-btn">📸 Get My Career Card</button>
      <button class="btn big" id="next-player">▶ Next Player</button>
      <button class="btn big" id="to-quiz">🧭 Take the Career Quiz</button>
      <button class="btn big" id="home3">🏠 Home</button>
    </div>`);
  setTimeout(()=>$$('.fill[data-w]').forEach(f=>f.style.width=f.dataset.w+'%'), 50);
  const g = game;
  $('#card-btn').onclick = ()=> openCardModal({name:g.name, career:best.career, line1:`${total} points${g.mode==='hard'?' · HARD':''}`, line2:`Rank #${rank} on the leaderboard · Best job: ${best.title}`});
  $('#next-player').onclick = renderNameEntry; $('#to-quiz').onclick = startQuiz; $('#home3').onclick = renderHome;
}

/* ---- Level 1: Phishing ---- */
function playPhish(body, api){
  const items = shuffle(PHISH).slice(0, isHard()?10:8); api.setTotal(items.length);
  const marks = []; let i = 0, hinted = -1;
  api.setHint(()=>{
    if(i >= items.length || hinted === i) return false;
    hinted = i;
    return 'Check: Is the sender or link an OFFICIAL name/domain? Is it asking for money, a password, OTP, MPIN or PIN? Is it rushing you? If yes, it\'s probably a scam.';
  });
  function show(){
    if(i >= items.length) return api.done();
    const m = items[i];
    body.innerHTML = `<div class="dots">${items.map((_,j)=>`<i class="${marks[j]||''} ${j===i?'cur':''}"></i>`).join('')}</div>
      <div class="msg-card ${m.k} fade-in"><div class="kind">${m.k==='sms'?'📱 Text message':'✉️ Email'} · ${i+1} of ${items.length}</div>
      <div class="from">From: ${esc(m.from)}</div>${m.subj?`<div class="subj">Subject: ${esc(m.subj)}</div>`:''}<div class="body">${esc(m.body)}</div><div id="why"></div></div>
      <div class="row center"><button class="btn good big" data-a="0">✅ Legit</button><button class="btn bad big" data-a="1">🚩 Phishing</button></div>`;
    $$('button[data-a]', body).forEach(b=>b.onclick=()=>{
      $$('button[data-a]', body).forEach(x=>x.disabled=true);
      const ok = (b.dataset.a==='1') === m.phish; marks[i] = ok?'ok':'no';
      ok ? api.good() : api.bad();
      $('#why', body).innerHTML = `<div class="why ${ok?'ok':'no'}">${ok?'✔ Correct!':'✘ Not quite.'} It's ${m.phish?'PHISHING':'LEGIT'}. ${esc(m.why)}</div>`;
      i++; api.later(show, 2200);
    });
  }
  show();
}

/* ---- Level 2: Web Dev ---- */
function playWeb(body, api){
  const POOL = [
    {label:'Alert Box', cls:'wd-alert', text:'⚠️ Your assignment is due tomorrow!', props:{'background':['gold','lightcoral','lightgreen','lightblue'],'color':['black','darkred','navy'],'font-weight':['normal','bold'],'border-left':['10px solid black','10px solid red','none']}},
    {label:'Page Title', cls:'wd-title', text:'Career Fair 2026', props:{'color':['crimson','teal','purple','black'],'font-size':['20px','30px','42px'],'text-transform':['none','uppercase','lowercase'],'font-style':['normal','italic']}},
    {label:'Badge', cls:'wd-badge', text:'NEW', props:{'background':['crimson','dodgerblue','gold','limegreen'],'color':['white','black'],'border-radius':['0px','8px','50px'],'padding':['4px 10px','10px 20px','16px 32px']}},
    {label:'Button', cls:'wd-btn', text:'Enroll Now', props:{'background':['tomato','mediumseagreen','royalblue','orchid','orange'],'color':['white','black','yellow'],'border-radius':['0px','12px','40px'],'font-size':['14px','22px','32px']}},
    {label:'Profile Card', cls:'wd-card', text:'<b>Juan Dela Cruz</b><br>Future Developer', props:{'background':['lightskyblue','khaki','palegreen','pink'],'border':['4px solid black','4px dashed royalblue','4px dotted tomato','none'],'text-align':['left','center','right'],'font-family':['serif','sans-serif','monospace']}}
  ];
  const ROUNDS = shuffle(POOL).slice(0, isHard()?4:3);
  api.setTotal(ROUNDS.reduce((s,r)=>s+Object.keys(r.props).length,0));
  const css = o => Object.entries(o).map(([k,v])=>`${k}:${v}`).join(';');
  let r = 0;
  function round(){
    if(r >= ROUNDS.length) return api.done();
    const R = ROUNDS[r], keys = Object.keys(R.props), target = {}, mine = {};
    keys.forEach(k=>{ const o = R.props[k]; target[k] = pick(o); mine[k] = pick(o.filter(v=>v!==target[k])); });
    body.innerHTML = `<p class="center muted">Round ${r+1} of ${ROUNDS.length} · <b style="color:var(--text)">${R.label}</b>: change the values in <b style="color:var(--text)">style.css</b> until both sides match.</p>
      <div class="wd-grid fade-in">
        <div class="wd-pane"><div class="pane-label">🎯 Target Design</div><div class="wd-stage"><div class="${R.cls}" style="${css(target)}">${R.text}</div></div></div>
        <div class="wd-pane"><div class="pane-label">👀 Your Output</div><div class="wd-stage"><div class="${R.cls}" id="mine" style="${css(mine)}">${R.text}</div></div></div>
        <div class="wd-code"><div class="pane-label">📝 style.css</div><pre class="code"><span class="sel">.${R.cls.replace('wd-','')}</span> {\n${keys.map(k=>`  <span class="prop">${k}</span>: <select data-k="${k}">${R.props[k].map(v=>`<option${v===mine[k]?' selected':''}>${v}</option>`).join('')}</select>;`).join('\n')}\n}</pre>
        <div class="row"><button class="btn primary big" id="check">▶ Run & Check</button></div></div>
      </div>`;
    const out = $('#mine', body); let checked = false;
    $$('select', body).forEach(s=>s.onchange=()=>{ mine[s.dataset.k] = s.value; out.setAttribute('style', css(mine)); SFX.click(); });
    api.setHint(()=>{
      if(checked) return false;
      const wrong = $$('select', body).find(s=>s.value !== target[s.dataset.k]);
      if(!wrong) return 'Everything already matches! Press Run & Check.';
      wrong.classList.add('hint-flash'); setTimeout(()=>wrong.classList.remove('hint-flash'), 2200);
      return `Look at <b>${wrong.dataset.k}</b>. The target uses <b>${target[wrong.dataset.k]}</b>.`;
    });
    $('#check', body).onclick = ()=>{
      checked = true; let n = 0;
      $$('select', body).forEach(s=>{ const ok = s.value === target[s.dataset.k]; if(ok) n++; s.classList.add(ok?'ok':'no'); s.disabled = true; });
      $('#check', body).disabled = true;
      n === keys.length ? api.good(`🎉 Pixel perfect! ${n}/${keys.length} properties match`, n) : n ? api.good(`${n}/${keys.length} properties match. Red ones were wrong.`, n) : api.bad(`0/${keys.length} matched. Red ones were wrong.`);
      r++; api.later(round, 2000);
    };
  }
  round();
}

/* ---- Level 3: QA ---- */
function playQA(body, api){
  const sc = pick(QA_SCENES), pen = qaPenalty();
  body.innerHTML = `<div class="qa-wrap fade-in"><div class="phone"><div class="app-screen">${sc.html}</div></div>
    <div class="found-list"><h3>🐞 Bug Report: ${sc.title}</h3><p class="muted">Click anything wrong on the app screen. Wrong clicks cost ${pen} seconds.</p><ol id="buglist"></ol></div></div>`;
  const bugs = $$('[data-bug]', body); api.setTotal(bugs.length);
  const list = $('#buglist', body), found = [];
  const draw = ()=>{ list.innerHTML = bugs.map((_,i)=> found[i] ? `<li>${esc(found[i])}</li>` : `<li class="empty">???</li>`).join(''); };
  draw();
  api.setHint(()=>{
    const left = bugs.filter(b=>!b.classList.contains('found')); if(!left.length) return false;
    const b = pick(left); b.classList.add('hint-flash'); setTimeout(()=>b.classList.remove('hint-flash'), 2200);
    return 'Look at the flashing part of the screen. Something is wrong there!';
  });
  body.addEventListener('click', e=>{
    if(api.finished) return;
    const el = e.target.closest('[data-bug],[data-ok]'); if(!el || el.classList.contains('found')) return;
    if(el.dataset.bug){
      el.classList.add('found'); el.classList.remove('hint-flash'); found[found.filter(Boolean).length] = el.dataset.bug; draw();
      api.good('🐞 Bug found! ' + esc(el.dataset.bug));
      if(found.length === bugs.length) api.later(api.done, 1500);
    } else {
      el.classList.add('nope'); setTimeout(()=>el.classList.remove('nope'), 450);
      api.bad(`That part is fine! −${pen} seconds`); api.penalty(pen);
    }
  });
}

/* ---- Level 4: Data ---- */
function playData(body, api){
  const DAYS = ['Mon','Tue','Wed','Thu','Fri'], hard = isHard();
  const themes = [
    {title:'School Canteen Sales This Week', noun:'sales', fmt:x=>'₱'+x.toLocaleString()},
    {title:'Downloads of the School App This Week', noun:'downloads', fmt:x=>x.toLocaleString()},
    {title:'School Website Visitors This Week', noun:'visitors', fmt:x=>x.toLocaleString()},
    {title:'Steps Walked by a Student This Week', noun:'steps', fmt:x=>x.toLocaleString()},
    {title:'Plastic Bottles Collected for Recycling', noun:'bottles collected', fmt:x=>x.toLocaleString()},
    {title:'Likes on the School FB Page This Week', noun:'likes', fmt:x=>x.toLocaleString()}
  ];
  const T = pick(themes), TH = 3000;
  let D;
  for(;;){
    const v = DAYS.map(()=> (10 + Math.floor(Math.random()*41)) * 100);
    if(v.includes(TH)) continue;
    const mx = Math.max(...v), mn = Math.min(...v);
    if(v.filter(x=>x===mx).length>1 || v.filter(x=>x===mn).length>1) continue;
    const drops = v.slice(1).map((x,i)=>v[i]-x), md = Math.max(...drops);
    if(md < 400 || drops.filter(d=>d===md).length>1) continue;
    const rises = drops.map(d=>-d), mr = Math.max(...rises);
    if(mr < 400 || rises.filter(d=>d===mr).length>1) continue;
    const sorted = [...v].sort((a,b)=>b-a); if(sorted[0]===sorted[1] || sorted[1]===sorted[2]) continue;
    if(hard && (sorted[0]-sorted[1] < 300 || sorted[1]-sorted[2] < 300 || Math.abs(v[0]-v[4]) < 300 || v.some(x=>Math.abs(x-TH) < 300))) continue;
    if(v[0] === v[4]) continue;
    const above = v.filter(x=>x>TH).length; if(above<1 || above>4) continue;
    D = {v, hi:v.indexOf(mx), lo:v.indexOf(mn), drop:drops.indexOf(md)+1, rise:rises.indexOf(mr)+1, second:v.indexOf(sorted[1]), diff:mx-mn, above}; break;
  }
  const W=680,H=320,PL=64,PB=40,PT=30,PR=16, cw=(W-PL-PR)/DAYS.length, y = val => PT + (H-PT-PB)*(1-val/5000);
  let svg = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${T.title}">`;
  for(let g=0; g<=5000; g+=(hard?500:1000)) svg += `<line x1="${PL}" x2="${W-PR}" y1="${y(g)}" y2="${y(g)}" stroke="#1f5236"/><text x="${PL-8}" y="${y(g)+5}" fill="#a3c9b2" font-size="13" text-anchor="end">${T.fmt(g)}</text>`;
  D.v.forEach((val,i)=>{ const x = PL + i*cw + cw*.18, bw = cw*.64;
    svg += `<rect x="${x}" y="${y(val)}" width="${bw}" height="${y(0)-y(val)}" rx="6" fill="url(#gr)"/>${hard?'':`<text x="${x+bw/2}" y="${y(val)-8}" fill="#effaf3" font-size="15" font-weight="700" text-anchor="middle">${T.fmt(val)}</text>`}<text x="${x+bw/2}" y="${H-12}" fill="#d3ecdc" font-size="15" font-weight="700" text-anchor="middle">${DAYS[i]}</text>`; });
  svg += `<line x1="${PL}" x2="${W-PR}" y1="${y(TH)}" y2="${y(TH)}" stroke="#f59e0b" stroke-dasharray="6 5" stroke-width="2"/><text x="${W-PR}" y="${y(TH)-6}" fill="#f59e0b" font-size="12" text-anchor="end">target: ${T.fmt(TH)}</text>`;
  svg += `<defs><linearGradient id="gr" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4ade80"/><stop offset="1" stop-color="#facc15"/></linearGradient></defs></svg>`;
  const diffOpts = shuffle([D.diff].concat(shuffle([D.diff+200, D.diff-200, D.diff+500, D.diff-500, D.diff+1000].filter(x=>x>0)).slice(0,3))).map(T.fmt);
  const pool = [
    {q:`Which day had the <b>BIGGEST INCREASE</b> compared to the day before?`, o:DAYS.slice(1), a:DAYS[D.rise]},
    {q:`Which day had the <b>SECOND HIGHEST</b> ${T.noun}?`, o:DAYS, a:DAYS[D.second]},
    {q:`How much higher was the <b>highest</b> day than the <b>lowest</b> day?`, o:diffOpts, a:T.fmt(D.diff), labels:true},
    {q:`From <b>Monday to Friday</b>, did ${T.noun} go up or down overall?`, o:['📈 Up','📉 Down'], a:D.v[4]>D.v[0]?'📈 Up':'📉 Down'},
    {q:`Which day had the <b>HIGHEST</b> ${T.noun}?`, o:DAYS, a:DAYS[D.hi]},
    {q:`Which day had the <b>LOWEST</b> ${T.noun}?`, o:DAYS, a:DAYS[D.lo]},
    {q:`Which day had the <b>BIGGEST DROP</b> compared to the day before?`, o:DAYS.slice(1), a:DAYS[D.drop]},
    {q:`On how many days were ${T.noun} <b>above the target</b> of ${T.fmt(TH)}?`, o:['1','2','3','4'], a:String(D.above)}
  ];
  /* extra questions */
  { const below = 5 - D.above, avg = D.v.reduce((a,b)=>a+b,0)/5, dist = D.v.map(x=>Math.abs(x-TH)), sd = dist.slice().sort((a,b)=>a-b);
    pool.push({q:`On how many days were ${T.noun} <b>below the target</b> of ${T.fmt(TH)}?`, o:['1','2','3','4'], a:String(below)});
    if(avg !== TH) pool.push({q:`Was the <b>average</b> for the week <b>above or below</b> the target of ${T.fmt(TH)}?`, o:['Above','Below'], a:avg>TH?'Above':'Below', h:'Imagine the bars evened out. Do they end up above or below the dashed target line?'});
    if(sd[1]-sd[0] >= 300) pool.push({q:`Which day was <b>closest to the target</b> of ${T.fmt(TH)}?`, o:DAYS, a:DAYS[dist.indexOf(sd[0])]});
    if(Math.abs(D.v[2]-D.v[3]) >= 300) pool.push({q:`Did <b>Wednesday</b> have <b>more ${T.noun}</b> than <b>Thursday</b>?`, o:['Yes','No'], a:D.v[2]>D.v[3]?'Yes':'No', h:'Compare the Wed bar with the Thu bar.'});
    pool.push({q:`How many ${T.noun} were there on <b>Wednesday</b>?`, o:shuffle([D.v[2]].concat(shuffle([D.v[2]+200, D.v[2]-200, D.v[2]+500, D.v[2]-500, D.v[2]+1000].filter(x=>x>0)).slice(0,3))).map(T.fmt), a:T.fmt(D.v[2]), labels:true});
  }
  const Qs = shuffle(pool.filter(q=>!(hard && q.labels))).slice(0, hard?7:6);
  api.setTotal(Qs.length);
  let i = 0, hinted = -1;
  body.innerHTML = `<div class="chart-box fade-in"><h3 class="center">📈 ${T.title}</h3>${svg}</div><div id="dq"></div>`;
  const dq = $('#dq', body);
  api.setHint(()=>{
    if(i >= Qs.length || hinted === i) return false;
    const Q = Qs[i]; hinted = i;
    if(Q.o.length <= 2) return Q.h || 'Compare the height of the <b>Mon</b> bar with the <b>Fri</b> bar.';
    const wrong = shuffle($$('.opt', dq).filter(b=>b.dataset.v !== Q.a && !b.disabled)).slice(0, Q.o.length >= 5 ? 2 : 1);
    wrong.forEach(b=>{ b.classList.add('elim'); b.disabled = true; });
    return `Removed ${wrong.length} wrong answer${wrong.length>1?'s':''}.`;
  });
  function ask(){
    if(i >= Qs.length) return api.done();
    const Q = Qs[i];
    dq.innerHTML = `<p class="q-small fade-in">Q${i+1}/${Qs.length}: ${Q.q}</p><div class="opt-grid compact">${Q.o.map(o=>`<button class="opt" data-v="${o}">${o}</button>`).join('')}</div>`;
    $$('.opt', dq).forEach(b=>b.onclick=()=>{
      $$('.opt', dq).forEach(x=>{ x.disabled = true; if(x.dataset.v===Q.a) x.classList.add('right'); });
      if(b.dataset.v === Q.a) api.good('✔ Correct!'); else { b.classList.add('wrong'); api.bad(`✘ The answer is ${Q.a}`); }
      i++; api.later(ask, 1300);
    });
  }
  ask();
}

/* ---- Level 5: UI/UX ---- */
function playUX(body, api){
  const rounds = shuffle(UX_PAIRS).slice(0, isHard()?6:5); api.setTotal(rounds.length);
  let i = 0, hinted = -1;
  api.setHint(()=>{
    if(i >= rounds.length || hinted === i) return false;
    hinted = i; return `Designer tip: ${rounds[i].why}`;
  });
  function show(){
    if(i >= rounds.length) return api.done();
    const P = rounds[i], goodSide = Math.random() < .5 ? 'A' : 'B';
    const html = side => side===goodSide ? P.good : P.bad;
    body.innerHTML = `<p class="q-small fade-in">Round ${i+1}/${rounds.length}: <b>${P.q}</b></p>
      <div class="ux-grid fade-in">${['A','B'].map(s=>`<div class="ux-opt" role="button" tabindex="0" data-s="${s}"><div class="ux-label">Design ${s}</div><div class="ux-screen">${html(s)}</div></div>`).join('')}</div>
      <div class="ux-why" id="uxwhy"></div>`;
    let answered = false;
    $$('.ux-opt', body).forEach(o=>{ const choose = ()=>{
      if(answered) return; answered = true; hinted = i;
      $$('.ux-opt', body).forEach(x=>x.classList.add(x.dataset.s===goodSide?'right':'wrong'));
      const ok = o.dataset.s === goodSide; ok ? api.good() : api.bad();
      $('#uxwhy', body).innerHTML = `${ok?'✔ Correct!':'✘ Design '+goodSide+' is better.'} ${P.why}`;
      i++; api.later(show, 2300);
    }; o.onclick = choose; o.onkeydown = e=>{ if(e.key==='Enter'||e.key===' ') choose(); }; });
  }
  show();
}

/* ---- Level 6: Game Dev (tune the game like a real developer) ---- */
const GAME_PROPS = [
  {k:'playerSpeed', name:'Player speed', min:1, max:10},
  {k:'jumpHeight',  name:'Jump height',  min:1, max:10},
  {k:'enemySpeed',  name:'Enemy speed',  min:1, max:10},
  {k:'enemies',     name:'Enemies',      min:1, max:8},
  {k:'lives',       name:'Lives',        min:1, max:5}
];
const GAME_BRIEFS = [
  {title:'A game for little kids', pitch:'Easy and forgiving. Nobody should lose quickly!', start:{playerSpeed:5,jumpHeight:5,enemySpeed:8,enemies:6,lives:1}, reqs:[
    {t:'Enemies are SLOW', f:v=>v.enemySpeed<=3}, {t:'Only a FEW enemies', f:v=>v.enemies<=3}, {t:'The player has MANY lives', f:v=>v.lives>=4}]},
  {title:'Hardcore challenge', pitch:'Only for experts. One mistake and it is game over!', start:{playerSpeed:5,jumpHeight:5,enemySpeed:2,enemies:2,lives:4}, reqs:[
    {t:'Enemies are FAST', f:v=>v.enemySpeed>=8}, {t:'MANY enemies', f:v=>v.enemies>=6}, {t:'Only ONE life', f:v=>v.lives===1}]},
  {title:'Moon level', pitch:'Low gravity! The player floats high and moves slowly.', start:{playerSpeed:6,jumpHeight:3,enemySpeed:6,enemies:4,lives:3}, reqs:[
    {t:'Jumps are HIGH', f:v=>v.jumpHeight>=8}, {t:'The player moves SLOWLY', f:v=>v.playerSpeed<=3}, {t:'Enemies are SLOW', f:v=>v.enemySpeed<=4}]},
  {title:'Endless runner', pitch:'Super fast running, with just a few enemies to jump over.', start:{playerSpeed:3,jumpHeight:8,enemySpeed:5,enemies:6,lives:3}, reqs:[
    {t:'The player is FAST', f:v=>v.playerSpeed>=8}, {t:'Jump height is in the MIDDLE (4 to 6)', f:v=>v.jumpHeight>=4 && v.jumpHeight<=6}, {t:'Only a FEW enemies', f:v=>v.enemies<=3}]},
  {title:'Boss fight', pitch:'One giant, super fast boss. The player gets a few lives.', start:{playerSpeed:5,jumpHeight:5,enemySpeed:3,enemies:4,lives:1}, reqs:[
    {t:'Exactly ONE enemy (the boss)', f:v=>v.enemies===1}, {t:'The boss is FAST', f:v=>v.enemySpeed>=8}, {t:'At least 3 lives', f:v=>v.lives>=3}]},
  {title:'Balanced for everyone', pitch:'Not too easy, not too hard. Go for the middle!', start:{playerSpeed:5,jumpHeight:2,enemySpeed:9,enemies:4,lives:5}, reqs:[
    {t:'Enemy speed is in the MIDDLE (4 to 7)', f:v=>v.enemySpeed>=4 && v.enemySpeed<=7}, {t:'Jump height is in the MIDDLE (4 to 7)', f:v=>v.jumpHeight>=4 && v.jumpHeight<=7}, {t:'Exactly 3 lives', f:v=>v.lives===3}]}
];
function playGame(body, api){
  const rounds = shuffle(GAME_BRIEFS).slice(0, isHard()?4:3);
  api.setTotal(rounds.reduce((n,b)=>n+b.reqs.length, 0));
  let r = 0, v = {}, locked = false;
  const preview = ()=>{
    const ens = Array.from({length:v.enemies}, (_,i)=>`<span class="gt-enemy" style="animation-duration:${((11-v.enemySpeed)*0.35).toFixed(2)}s;animation-delay:-${(i*0.9).toFixed(2)}s;bottom:${34+(i%3)*16}px">👾</span>`).join('');
    return `<div class="gt-stage"><div class="gt-ground" style="animation-duration:${((11-v.playerSpeed)*0.12).toFixed(2)}s"></div>
      <span class="gt-player" style="--jh:${v.jumpHeight*10}px">🐶</span>${ens}<div class="gt-lives">${'❤️'.repeat(v.lives)}</div></div>`;
  };
  const refresh = ()=>{ GAME_PROPS.forEach(p=>{ $('#gv-'+p.k, body).textContent = v[p.k]; }); $('#gt-prev', body).innerHTML = preview(); };
  api.setHint(()=>{
    if(locked || r >= rounds.length) return false;
    const bad = rounds[r].reqs.find(q=>!q.f(v));
    return bad ? 'Not matching yet: ' + bad.t : false;
  });
  function renderRound(){
    if(r >= rounds.length) return api.done();
    const B = rounds[r]; v = Object.assign({}, B.start); locked = false;
    body.innerHTML = `<p class="center muted" style="margin:0 0 8px">Round ${r+1} of ${rounds.length}</p>
      <div class="gt-brief"><h3>📩 Client brief: ${B.title}</h3><p>${B.pitch}</p><ul>${B.reqs.map(q=>`<li>${q.t}</li>`).join('')}</ul></div>
      <div class="gt-grid">
        <div class="gt-code"><div class="gt-cap">game.js</div><div class="gt-line">const game = {</div>
          ${GAME_PROPS.map(p=>`<div class="gt-line gt-ind"><span class="gt-key">${p.k}</span>: <button class="icon-btn gt-step" data-k="${p.k}" data-d="-1">−</button><b class="gt-val" id="gv-${p.k}"></b><button class="icon-btn gt-step" data-k="${p.k}" data-d="1">+</button>,</div>`).join('')}
          <div class="gt-line">};</div></div>
        <div class="gt-pane"><div class="gt-cap">Live preview</div><div id="gt-prev"></div></div>
      </div>
      <p class="muted center" style="margin:8px 0">Scale: 1 = lowest, 10 = highest (Enemies go up to 8, Lives up to 5)</p>
      <div class="row center"><button class="btn primary big" id="gt-run">▶ Run & Check</button></div>`;
    $$('.gt-step', body).forEach(b=>b.onclick = ()=>{
      if(locked) return; const p = GAME_PROPS.find(x=>x.k === b.dataset.k);
      v[p.k] = Math.min(p.max, Math.max(p.min, v[p.k] + Number(b.dataset.d))); refresh();
    });
    $('#gt-run', body).onclick = ()=>{
      if(locked) return; locked = true;
      const res = B.reqs.map(q=>q.f(v)), n = res.filter(Boolean).length;
      $$('.gt-brief li', body).forEach((li,i)=>{ li.classList.add(res[i] ? 'ok' : 'no'); li.insertAdjacentHTML('afterbegin', res[i] ? '✔ ' : '✘ '); });
      n === res.length ? api.good(`🎉 Game shipped! ${n}/${res.length} requirements met`, n)
        : n ? api.good(`${n}/${res.length} requirements met. Red ones were wrong.`, n)
        : api.bad(`0/${res.length} requirements met. Read the brief again!`);
      r++; api.later(renderRound, 2300);
    };
    refresh();
  }
  renderRound();
}

/* Parse Excel-compatible CSV, including quoted commas and escaped quotes. */
function parseLeaderboardCSV(text){
  text=String(text).replace(/^\uFEFF/,'');
  const rows=[];let row=[],field='',quoted=false;
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    if(quoted){if(ch==='"'&&text[i+1]==='"'){field+='"';i++;}else if(ch==='"'){quoted=false;}else{field+=ch;}}
    else if(ch==='"'){quoted=true;}
    else if(ch===','){row.push(field);field='';}
    else if(ch==='\n'){row.push(field);rows.push(row);row=[];field='';}
    else if(ch!=='\r'){field+=ch;}
  }
  if(field.length||row.length){row.push(field);rows.push(row);}
  if(rows.length<2)throw new Error('No leaderboard rows found');
  const headers=rows.shift().map(x=>x.trim().toLowerCase());
  const col=name=>headers.indexOf(name);
  const nameCol=col('name'),scoreCol=col('score');
  if(nameCol<0||scoreCol<0)throw new Error('CSV must contain Name and Score columns');
  const careerCol=col('best fit'),strandCol=col('strand'),modeCol=col('difficulty'),timeCol=col('time');
  const careerByName=Object.entries(CAREERS).reduce((a,[k,v])=>{a[v.name.toLowerCase()]=k;return a;},{});
  return rows.filter(r=>(r[nameCol]||'').trim()!==''&&r[scoreCol]!==undefined).map((r,i)=>{
    const rawScore=String(r[scoreCol]||'').replace(/,/g,'').trim();
    const score=Number(rawScore);if(!Number.isFinite(score)||score<0) return null;
    const careerName=careerCol>=0?String(r[careerCol]||'').trim().toLowerCase():'';
    const mode=modeCol>=0&&String(r[modeCol]).trim().toLowerCase()==='hard'?'hard':'easy';
    const parsedTime=timeCol>=0?Date.parse(r[timeCol]):NaN;
    return {name:String(r[nameCol]).trim().slice(0,30),strand:strandCol>=0?String(r[strandCol]||'').trim():'',mode,career:careerByName[careerName]||'',score:Math.round(score),ts:Number.isFinite(parsedTime)?parsedTime:Date.now()+i,manual:true,restoredFromCSV:true};
  }).filter(Boolean);
}

/* ---------------- leaderboard screens ---------------- */
function renderBoard(){
  page('board', `<div class="card fade-in"><div class="row" style="justify-content:space-between"><h2>🏆 Leaderboard</h2>
      <div class="row"><button class="btn small" id="tv">📺 Open TV display</button><button class="btn small" id="csv">⬇ Excel CSV</button><button class="btn small bad" id="reset">Reset all</button></div></div>
      ${boardTable(100)}</div>
    <div class="card" style="margin-top:20px"><h3>🛠 Admin: Manage leaderboard</h3><p class="muted">Add scores recorded on another laptop, or remove an incorrect entry. Changes are saved on this laptop.</p>
      <div class="admin-score-form">
        <label class="lbl">Player name<input class="text" id="admin-name" maxlength="30" placeholder="Player name"></label>
        <label class="lbl">SHS strand<select class="text" id="admin-strand">${CONFIG.strands.map(x=>`<option>${esc(x)}</option>`).join('')}</select></label>
        <label class="lbl">Difficulty<select class="text" id="admin-mode"><option value="easy">Easy</option><option value="hard">Hard</option></select></label>
        <label class="lbl">Best-fit career<select class="text" id="admin-career">${Object.entries(CAREERS).map(([k,c])=>`<option value="${k}">${esc(c.name)}</option>`).join('')}</select></label>
        <label class="lbl">Score<input class="text" id="admin-score" type="number" min="0" max="999999" placeholder="e.g. 2450"></label>
        <button class="btn primary" id="admin-add">＋ Add player score</button>
      </div>
      <div class="table-wrap"><table class="board"><thead><tr><th>Name</th><th>Difficulty</th><th>Career</th><th>Score</th><th>Action</th></tr></thead><tbody id="admin-score-rows">${adminScoreRows()}</tbody></table></div>
    </div>
    <div class="card" style="margin-top:20px"><h3>💾 Transfer / backup data</h3><p class="muted">Use the JSON backup to move the leaderboard between laptops. Export on the other laptop, then import it here on the main laptop. You can also export the leaderboard as CSV, open it in Microsoft Excel, and import that same CSV later to restore scores if this browser’s local data is lost. Keep the JSON backup too for a complete booth backup.</p>
      <div class="row"><button class="btn" id="backup-export">⬇ Export full backup (JSON)</button><button class="btn" id="backup-import-btn">⬆ Import backup (JSON)</button><input id="backup-file" type="file" accept=".json,application/json" hidden></div>
      <div class="row" style="margin-top:10px"><button class="btn" id="excel-import-btn">📥 Restore leaderboard from Excel CSV</button><input id="excel-file" type="file" accept=".csv,text/csv,application/vnd.ms-excel" hidden></div>
    </div>
    <div class="card" style="margin-top:20px"><h3>🧭 Career Quiz Results</h3>${tallyBars()}</div>
    <footer class="foot"><button class="btn big" id="home4">🏠 Home</button></footer>`);
  $('#home4').onclick = renderHome;
  $('#tv').onclick = ()=> window.open(location.href.split('#')[0] + '#tv', '_blank');
  $('#csv').onclick = ()=>{
    const rows = [['Rank','Name','Strand','Difficulty','Best Fit','Score','Time']].concat(sortedScores().map((r,i)=>[i+1, r.name, r.strand||'', r.mode||'', CAREERS[r.career]?CAREERS[r.career].name:'', r.score, new Date(r.ts).toLocaleString()]));
    const csv = '\ufeff' + rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); a.download = 'tech-career-leaderboard.csv'; a.click(); URL.revokeObjectURL(a.href);
  };
  $('#admin-add').onclick=()=>{
    if(!askPin('Enter admin PIN to add a leaderboard entry:'))return;
    const name=$('#admin-name').value.trim(), score=Number($('#admin-score').value);
    if(!name||$('#admin-score').value===''||!Number.isFinite(score)||score<0){toast('Enter a player name and a valid score.','bad');return;}
    const rows=getScores();rows.push({name,strand:$('#admin-strand').value,mode:$('#admin-mode').value,career:$('#admin-career').value,score:Math.round(score),ts:Date.now(),manual:true});store.set('tcb_scores',rows);toast('Player score added.','good');renderBoard();
  };
  $('#admin-score-rows').onclick=e=>{
    const b=e.target.closest('[data-delete-score]');if(!b)return;
    if(!askPin('Enter admin PIN to delete this player score:'))return;
    const ts=Number(b.dataset.deleteScore);store.set('tcb_scores',getScores().filter(r=>r.ts!==ts));toast('Leaderboard entry deleted.','info');renderBoard();
  };
  $('#reset').onclick = ()=>{ if(askPin('Enter admin PIN to DELETE all scores and quiz results:') && confirm('Delete every leaderboard score and quiz result from this laptop?')){ store.set('tcb_scores', []); store.set('tcb_quiz_tally', {}); toast('Leaderboard cleared','info'); renderBoard(); } };
  $('#backup-export').onclick=()=>{
    const data={format:'tech-career-booth-backup',version:1,exportedAt:new Date().toISOString(),scores:getScores(),quizTally:store.get('tcb_quiz_tally',{}),settings:store.get('tcb_settings',{})};
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));a.download='tech-career-booth-backup.json';a.click();URL.revokeObjectURL(a.href);
  };
  $('#backup-import-btn').onclick=()=>$('#backup-file').click();
  $('#backup-file').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    if(!askPin('Enter admin PIN to import and replace this laptop’s booth data:')){e.target.value='';return;}
    try{const data=JSON.parse(await file.text());if(data.format!=='tech-career-booth-backup'||!Array.isArray(data.scores))throw new Error('Invalid backup');
      if(!confirm(`Import ${data.scores.length} leaderboard entries? This replaces the current leaderboard and quiz results on this laptop.`))return;
      store.set('tcb_scores',data.scores);store.set('tcb_quiz_tally',data.quizTally||{});if(data.settings&&typeof data.settings==='object'){store.set('tcb_settings',data.settings);CONFIG=Object.assign({},DEFAULTS,data.settings);}toast('Backup imported successfully.','good');renderBoard();
    }catch(err){toast('Could not read this backup file.','bad',2600);}finally{e.target.value='';}
  };
  $('#excel-import-btn').onclick=()=>$('#excel-file').click();
  $('#excel-file').onchange=async e=>{
    const file=e.target.files[0];if(!file)return;
    if(!askPin('Enter admin PIN to restore leaderboard from Excel CSV:')){e.target.value='';return;}
    try{
      const imported=parseLeaderboardCSV(await file.text());
      if(!imported.length)throw new Error('No valid score rows');
      if(!confirm(`Restore ${imported.length} player scores from this Excel CSV? This REPLACES the current leaderboard on this laptop. Export the current leaderboard first if you need to keep it.`))return;
      store.set('tcb_scores',imported);toast(`Restored ${imported.length} player scores from Excel CSV.`,'good');renderBoard();
    }catch(err){toast('Could not import this CSV. Use the exported Tech Career Booth leaderboard CSV with Name and Score columns.','bad',4000);}finally{e.target.value='';}
  };
}
function adminScoreRows(){
  const rows=sortedScores();if(!rows.length)return '<tr><td colspan="5" class="muted center">No player scores yet.</td></tr>';
  return rows.map(r=>`<tr><td>${esc(r.name)}</td><td>${modeTag(r.mode)}</td><td>${CAREERS[r.career]?esc(CAREERS[r.career].name):'—'}</td><td class="score">${Number(r.score)||0}</td><td><button class="btn small bad" data-delete-score="${Number(r.ts)}">Delete</button></td></tr>`).join('');
}

function renderTV(){
  screen = 'tv';
  render('tv', `<div class="tv fade-in"><h1>🏆 ${esc(CONFIG.boothTitle)} Leaderboard</h1><p class="center lead">Play "A Day in the Life" at our booth and get on the board! · ${esc(CONFIG.courseName)}</p>
    <div class="tv-grid"><div class="card">${boardTable(10)}</div><div class="card"><h3>🧭 Quiz: Most Common Careers</h3>${tallyBars()}</div></div></div>`);
}

/* ---------------- settings ---------------- */
function renderSettings(){
  const names = ['Cybersecurity Analyst','Web Developer','QA Tester','Data Analyst','UI/UX Designer','Game Developer','AI / Machine Learning Engineer','Network & Cloud Engineer','Debug the Code'];
  const numIn = (id, label, val, min, max) => `<label class="lbl">${label}<input class="text" type="number" id="${id}" min="${min}" max="${max}" value="${val}"></label>`;
  page('settings', `<div class="card narrow fade-in" style="max-width:760px">
    <h2>⚙ Booth Settings</h2><p class="muted">Saved on this laptop only.</p>
    <div class="set-grid">
      <label class="lbl">Booth title<input class="text" id="s-title" maxlength="40" value="${esc(CONFIG.boothTitle)}"></label>
      <label class="lbl">Course name<input class="text" id="s-course" maxlength="60" value="${esc(CONFIG.courseName)}"></label>
      <label class="lbl">Tagline<input class="text" id="s-tag" maxlength="80" value="${esc(CONFIG.tagline)}"></label>
    </div>
    <h3 style="margin-top:22px">⏱ Level timers (seconds, Easy mode)</h3><p class="muted">Hard mode automatically uses 70% of these.</p>
    <div class="set-grid cols">${names.map((n,i)=>`<label class="lbl">${n}<input class="text" type="number" min="10" max="300" data-lv="${i}" value="${CONFIG.levelSeconds[i] || DEFAULTS.levelSeconds[i]}"></label>`).join('')}</div>
    <h3 style="margin-top:22px">Other</h3>
    <div class="set-grid cols">
      ${numIn('s-hint','Hint cost (points)',CONFIG.hintCost,0,500)}
      ${numIn('s-idle','Back to Home after idle (sec)',CONFIG.idleSeconds,20,600)}
      ${numIn('s-attract','Attract mode after (sec)',CONFIG.attractSeconds,10,600)}
      <label class="lbl">Admin PIN<input class="text" id="s-pin" maxlength="8" value="${esc(CONFIG.adminPin)}"></label>
    </div>
    <label class="check-row"><input type="checkbox" id="s-music" ${MUSIC.on!==false?'checked':''}> 🎵 Play background music</label>
    <div class="row" style="margin-top:24px"><button class="btn primary big" id="s-save">💾 Save</button><button class="btn big" id="s-defaults">Restore defaults</button><button class="btn big" id="s-cancel">Cancel</button></div>
  </div>`);
  const num = (sel, def, min, max)=>{ const v = parseInt($(sel).value,10); return isNaN(v) ? def : Math.min(max, Math.max(min, v)); };
  $('#s-save').onclick = ()=>{
    const s = {
      boothTitle: $('#s-title').value.trim() || DEFAULTS.boothTitle,
      courseName: $('#s-course').value.trim() || DEFAULTS.courseName,
      tagline: $('#s-tag').value.trim() || DEFAULTS.tagline,
      levelSeconds: $$('[data-lv]').map((el,i)=>{ const v = parseInt(el.value,10); return isNaN(v) ? DEFAULTS.levelSeconds[i] : Math.min(300, Math.max(10, v)); }),
      hintCost: num('#s-hint', DEFAULTS.hintCost, 0, 500),
      idleSeconds: num('#s-idle', DEFAULTS.idleSeconds, 20, 600),
      attractSeconds: num('#s-attract', DEFAULTS.attractSeconds, 10, 600),
      adminPin: $('#s-pin').value.trim() || DEFAULTS.adminPin
    };
    MUSIC.on = $('#s-music').checked; store.set('tcb_music', MUSIC.on); MUSIC.sync();
    store.set('tcb_settings', s); CONFIG = Object.assign({}, DEFAULTS, s); renderHome(); toast('Settings saved ✔','good');
  };
  $('#s-defaults').onclick = ()=>{ if(confirm('Restore all default settings?')){ store.set('tcb_settings', {}); MUSIC.on = !!DEFAULTS.musicDefault; store.set('tcb_music', MUSIC.on); MUSIC.sync(); CONFIG = Object.assign({}, DEFAULTS); renderSettings(); } };
  $('#s-cancel').onclick = renderHome;
}

/* ---------------- attract mode ---------------- */
const FACTS = [
  'The first computer "bug" was a real moth found stuck inside a computer in 1947.',
  'Ada Lovelace is known as the first computer programmer. She wrote her program in the 1840s!',
  'The Python programming language is named after a comedy show (Monty Python), not the snake.',
  'The first website ever made is still online: info.cern.ch',
  'Big video games are made by teams of programmers, artists, designers, and testers working together.',
  'Over 5 billion people around the world use the internet.',
  'The word "robot" comes from a Czech word that means "forced work".',
  'The first computer mouse, built by Douglas Engelbart in the 1960s, was made of wood.',
  'Google began in 1998 as a research project by two Stanford students, Larry Page and Sergey Brin.',
  'The very first text message (SMS) was sent in 1992 and it said "Merry Christmas".',
  'The Philippines is often called the "social media capital of the world" because Filipinos spend so much time online.',
  'Emojis were created in Japan in 1999 by Shigetaka Kurita.',
  'Computers only understand 0s and 1s. One byte is 8 of them!',
  '"Wi-Fi" does not officially stand for anything. It is just a brand name.',
  'Minecraft was first made by one person, Markus "Notch" Persson, before it became a huge game.',
  'The computer that guided Apollo 11 to the Moon was less powerful than a modern smartphone.',
  'Margaret Hamilton led the team that wrote the software for the Apollo Moon missions.',
  'Pong, one of the first video games, was released in 1972.',
  '"123456" is one of the most common passwords in the world. Never use it!',
  'Tim Berners-Lee invented the World Wide Web in 1989.',
  'Python was created by Guido van Rossum and first released in 1991.',
  'There are hundreds of programming languages, from Python and C++ to Scratch.',
  'There are millions of unfilled cybersecurity jobs around the world.',
  'People judge how a website looks in a fraction of a second. That is why UI/UX design matters!',
  'Bugs found after a game or app launches cost much more to fix than bugs found by testers early on.',
  'The Philippines first connected to the internet in 1994.',
  'The term "artificial intelligence" was first used in 1956.',
  'The "cloud" is really just computers in giant data centers that you connect to through the internet.',
  'The first iPhone was released in 2007.',
  'The first domain name ever registered was symbolics.com in 1985.'
];
const TIPS = [
  'Never share your OTP or PIN with anyone, even if they say they are from your bank or GCash.',
  'Check the sender carefully. Scammers use look-alike names like "paypa1" or "netfIix".',
  'If a deal sounds too good to be true, it is probably a scam.',
  'Use a different password for every account, and turn on 2-step verification.',
  'Before you click a link, check where it really goes. Official links match the official website.',
  'Real companies do not threaten you with "your account will be deleted in 24 hours".',
  'Keep your phone and apps updated. Updates fix security holes.',
  'A long password made of a few random words is stronger than a short, tricky one.',
  'Avoid logging in to your bank or GCash on public Wi-Fi.',
  'Got a suspicious message? Do not reply. Block the sender and report it.'
];
const TRIVIA = [
  {q:'What does "HTML" stand for?', a:'HyperText Markup Language'},
  {q:'What does "CPU" stand for?', a:'Central Processing Unit'},
  {q:'How many bits are in one byte?', a:'8'},
  {q:'Which one styles web pages: HTML, CSS, or SQL?', a:'CSS'},
  {q:'What do we call a mistake in a program?', a:'A bug'},
  {q:'What does "URL" stand for?', a:'Uniform Resource Locator'},
  {q:'Who is known as the first computer programmer?', a:'Ada Lovelace'},
  {q:'What do you use SQL for?', a:'Working with databases'},
  {q:'What does "UI" stand for?', a:'User Interface'},
  {q:'What does "RAM" stand for?', a:'Random Access Memory'},
  {q:'True or false: the Python language is named after a snake.', a:'False. It is named after Monty Python.'},
  {q:'What do you call a fake message that tricks you into giving your password?', a:'Phishing'}
];
let attract = null;
function startAttract(){
  if(attract) return;
  const el = document.createElement('div'); el.className = 'attract';
  const glyphs = Array.from({length:24}, ()=>`<span class="glyph" style="left:${Math.random()*100}%;animation-duration:${8+Math.random()*10}s;animation-delay:-${Math.random()*15}s;font-size:${18+Math.random()*30}px">${esc(pick(['</>','{ }','01','();','<div>','if','=>','#','[ ]','AI','🐞','💻','🛡️','🎮','📊','🎨']))}</span>`).join('');
  el.innerHTML = `<div class="glyphs">${glyphs}</div><div class="attract-slide" id="aslide"></div><div class="attract-cta">👆 Tap anywhere to play!</div>`;
  document.body.appendChild(el);
  let n = 0;
  const slides = ()=>{ const s = sortedScores(), top = s[0];
    const board = s.length ? `<h1>🏆 Top Players</h1><div class="a-board">${s.slice(0,5).map((r,i)=>`<div><span>${['🥇','🥈','🥉','4.','5.'][i]} ${esc(r.name)}</span><b>${r.score}</b></div>`).join('')}</div>` : `<h1>🏆 The leaderboard is empty!</h1><p class="lead">Be the first name on the board.</p>`;
    const c = CAREERS[pick(Object.keys(CAREERS))], tv = pick(TRIVIA);
    return [
      `<div class="a-big">🕹️</div><h1>Can you beat <span class="grad">${top && top.score>0 ? top.score+' points' : 'the game'}</span>?</h1><p class="lead">Choose at least 5 of ${LEVELS.length} mini-games and explore tech careers!</p>`,
      board,
      `<div class="a-big">💡</div><p class="eyebrow">Did you know?</p><h2 class="a-fact">${pick(FACTS)}</h2>`,
      `<div class="a-big">${c.icon}</div><p class="eyebrow">Tech career spotlight</p><h1>${c.name}</h1><p class="lead">${c.desc}</p><p class="lead">Skills: ${c.skills.join(' · ')}</p>`,
      `<div class="a-big">🧭</div><h1>What's your tech career?</h1><p class="lead">Take the 1-minute quiz and get your Career Card!</p>`,
      `<div class="a-big">🛡️</div><p class="eyebrow">Stay safe online</p><h2 class="a-fact">${pick(TIPS)}</h2>`,
      board,
      `<div class="a-big">🤔</div><p class="eyebrow">Tech trivia</p><h2 class="a-fact">${tv.q}</h2><p class="lead trivia-ans">Answer: <b>${tv.a}</b></p>`,
      `<div class="a-big">🚀</div><p class="eyebrow">${LEVELS.length} mini-games to try</p><h2 class="a-fact">${LEVELS.map(l=>CAREERS[l.career].icon+' '+l.title).join('<br>')}</h2>`,
      `<div class="a-big">💡</div><p class="eyebrow">Did you know?</p><h2 class="a-fact">${pick(FACTS)}</h2>`,
      `<div class="course-attract"><img src="logo.png" alt="School logo"><p class="eyebrow">Start your tech journey</p><h1><span class="grad">${esc(CONFIG.courseName)}</span></h1><p class="lead">Learn programming, databases, algorithms, software development, AI, networking, and more.</p><p class="lead"><b>Possible career paths:</b> Software Developer · Data Analyst · Cybersecurity · AI / ML · Network & Cloud · Game Developer</p><p class="lead"><b>Interested?</b> Visit the school admissions office or ask a St. Jude College representative about requirements, schedules, and enrollment.</p></div>`
    ]; };
  const show = ()=>{ const arr = slides(), sl = $('#aslide', el); sl.classList.remove('in'); void sl.offsetWidth; sl.innerHTML = arr[n % arr.length]; sl.classList.add('in'); n++; };
  show(); const id = setInterval(show, 6000);
  el.addEventListener('pointerdown', e=>{ e.preventDefault(); stopAttract(); lastInput = Date.now(); });
  attract = {el, id};
}
function stopAttract(){ if(!attract) return; clearInterval(attract.id); attract.el.remove(); attract = null; }
addEventListener('keydown', ()=>{ if(attract){ stopAttract(); lastInput = Date.now(); } });

/* ---------------- boot ---------------- */
['pointerdown','keydown','mousemove','touchstart'].forEach(ev=>addEventListener(ev, ()=>{ if(!attract) lastInput = Date.now(); }, {passive:true}));
setInterval(()=>{
  const idle = Date.now() - lastInput;
  if(screen === 'home'){ if(!attract && idle > CONFIG.attractSeconds*1000) startAttract(); return; }
  if(['tv','level','settings'].includes(screen)) return;
  if(idle > CONFIG.idleSeconds*1000) renderHome();
}, 2000);
addEventListener('storage', ()=>{ if(screen==='tv') renderTV(); });
setInterval(()=>{ if(screen==='tv') renderTV(); }, 10000);
if(location.hash === '#tv') renderTV(); else renderHome();
