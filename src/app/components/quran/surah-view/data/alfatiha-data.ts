export const alfatiha: Record<string, any> = {
  id: 'alfatiha',
  
  // ==========================================
  // ARABISKA (ar)
  // ==========================================
  ar: {
    name: 'سورة الفاتحة',
    hint: {
      surahName: 'همسة من سورة الفاتحة',
      hintText: 'إدعُ الله دومًا واطلب منه الهداية، فهو الهادي إلى الصراط المستقيم.'
    },
    tafseerSource: 'تفسير ابن كثير',
    introSummary: 'الثناء على اللَّه ← العبد يعلن عبوديته للَّه ← الختم بالدعاء و طلب الهداية.',
    verses: [
      { number: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', tafsir: '<b>الحمد</b>: هو الثناء على الله بصفاته ونعمه، وهو يتضمن أمر عباده أن يحمدوه. <br> <b>رب العالمين</b>: الخالق، الرازق، المحيي، المميت، المربي لجميع خلقه بنعمه.' },
      { number: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ', tafsir: '<b>الرحمن</b>: صاحب الرحمة العامة لجميع الخلق. <br> <b>الرحيم</b>: صاحب الرحمة الخاصة بالمؤمنين.' },
      { number: 4, text: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ', tafsir: 'مالك أمر <b>يوم القيامة</b> الذي يُجازي فيه العباد على أعمالهم، فيثيب المطيع ويعاقب العاصي.' },
      { number: 5, text: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ', tafsir: 'نخصك وحدك بالعبادة ونخصك وحدك بالاستعانة، فلا نعبد إلا إياك ولا نستعين إلا بك، إذ الأمر كله بيدك.' },
      { number: 6, text: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ', tafsir: 'وجّهنا ودلّنا وثبّتنا على الطريق المستقيم، طريق الحق الذي يوصل إلى رضاك وجنّتك.' },
      { number: 7, text: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ', tafsir: '<b>صراط الذين أنعمت عليهم</b>: طريق <b>النبيين</b> و<b>الصديقين</b> و<b>الشهداء</b> و<b>الصالحين</b>. <br> <b>غير المغضوب عليهم</b>: من عرفوا الحق وتركوه (مثل اليهود). <br> <b>ولا الضالين</b>: من جهلوا الحق وانحرفوا عنه (مثل النصارى).' }
    ],
    rubtTassweerySections: [
      { title: '🕊️ الثناء على اللَّه', description: 'تبدأ السورة بحمد اللَّه وتمجيده، وذكر صفاته العظيمة التي تبعث في القلب الطمأنينة، فهو رب العالمين، الرحمن الرحيم، مالك يوم الدين، مما يهيئ النفس للتوجه الصادق إليه.', verseNumbers: [2, 3, 4] },
      { title: '🧎‍♂️ التوجه و العبودية', description: 'بعد الثناء يأتي الإقرار بالعبودية الكاملة لله وحده، وطلب العون منه في كل أمر، فهو وحده المستحق للعبادة والاستعانة.', verseNumbers: [5] },
      { title: '🌟 طلب الهداية', description: 'ثم نختم بطلب أعظم ما يحتاجه الإنسان في حياته وآخرته: الهداية إلى الصراط المستقيم، طريق المنعَم عليهم، واجتناب طريق المغضوب عليهم والضالين، ليكتمل بذلك الدعاء الشامل.', verseNumbers: [6, 7] }
    ],
    questions: [
      {
        question: 'لماذا سميت سورة الفاتحة بهذا الاسم؟',
        answers: [
          { text: 'لأنها أول سورة نزلت', isCorrect: false },
          { text: 'لأنها تفتتح بها الصلاة فقط', isCorrect: false },
          { text: 'لأنه يفتتح بها القرآن', isCorrect: true },
          { text: 'لأنها آخر سورة في المصحف', isCorrect: false }
        ]
      },
      {
        question: 'ما معنى (الشيطان الرجيم)؟',
        answers: [
          { text: 'الذي يحب الخير للناس', isCorrect: false },
          { text: 'المطرود من رحمة الله', isCorrect: true },
          { text: 'المؤمن القوي', isCorrect: false },
          { text: 'العابد التقي', isCorrect: false }
        ]
      },
      {
        question: 'ما الفرق بين (الرحمن) و(الرحيم)؟',
        answers: [
          { text: 'كلاهما بمعنى واحد', isCorrect: false },
          { text: 'الرحمن بالمؤمنين، والرحيم بكل الخلق', isCorrect: false },
          { text: 'الرحمن رحمة عامة، والرحيم رحمة خاصة بالمؤمنين', isCorrect: true },
          { text: 'الرحيم أرحم من الرحمن', isCorrect: false }
        ]
      },
      {
        question: 'ما معنى (مالك يوم الدين)؟',
        answers: [
          { text: 'مالك يوم الجمعة', isCorrect: false },
          { text: 'مالك يوم القيامة', isCorrect: true },
          { text: 'مالك الدنيا', isCorrect: false },
          { text: 'مالك القرآن', isCorrect: false }
        ]
      },
      {
        question: 'من هم (المغضوب عليهم)؟',
        answers: [
          { text: 'الذين عرفوا الحق ولم يعملوا به', isCorrect: true },
          { text: 'الذين لم يعرفوا الحق', isCorrect: false },
          { text: 'المؤمنين', isCorrect: false },
          { text: 'الصالحين', isCorrect: false }
        ]
      },
      {
        question: 'من هم (الضالين)؟',
        answers: [
          { text: 'الذين عرفوا الحق وتركوه', isCorrect: false },
          { text: 'الذين لم يعرفوا الحق ولم يعملوا به', isCorrect: true },
          { text: 'الأنبياء', isCorrect: false },
          { text: 'الشهداء', isCorrect: false }
        ]
      },
      {
        question: 'ما معنى (آمين) بعد قراءة الفاتحة؟',
        answers: [
          { text: 'صدق الله العظيم', isCorrect: false },
          { text: 'يا رب استجب', isCorrect: true },
          { text: 'اللهم اغفر لنا', isCorrect: false },
          { text: 'لا معنى لها', isCorrect: false }
        ]
      }
    ],
    benefit: {
      title: 'فائدة:',
      text: 'يستحب للقارئ في الصلاة عند قراءة <span class="highlight">الفاتحة</span> أن يقول <strong>«آمين»</strong>، ومعناها: <em>يا رب استجب</em>.'
    },
    reminder: {
      title: 'تذكير:',
      content: `
        <strong>البسملة</strong> إتباعاً للنبي صلى الله عليه وسلم <br>
        <strong>وتطبيق لحديث:</strong> كل امر ذي بال لا يبدأ ببسم الله فهو أبتر أو أقطع <br>
        <strong>أبتر:</strong> <em>المقطوع، الذي لا نسل له، أو الذي انقطع أثره وذِكره.</em><br>
        <strong>أقطع:</strong> <em>مقطوع من الخير، لا يصل إلى تمامه، أو لا يُتمّ بنجاح.</em>
      `,
      hadithSummary: '📜 عرض الحديث',
      hadithText: `
        أَبِي هُرَيْرَةَ رضي الله عنه قَالَ : قَالَ رَسُولُ اللهِ ﷺ : 
        (كُلُّ كَلَامٍ أَوْ أَمْرٍ ذِي بَالٍ لَا يُفْتَحُ بِذِكْرِ اللهِ فَفهُوَ أَبْتَرُ - أَوْ قَالَ : أَقْطَعُ -) 
        رواه الإمام أحمد في "المسند".
      `
    },
    nezool: {
      dalel: 'علينا ياأحبتي أن نتعلم أن ديننا من القران والسنة وأن لانقبل قولاً في دينناإلا بدليل من القران أو السنة',
      nezoolText: `
        <ul class="benefit-list">
          <li>أنها ركن من أركان الصلاة، لا تصح الصلاة إلا بها.</li>
          <li>أنها أفضل سورة في القرآن.</li>
          <li>أنها السبع المثاني.</li>
          <li>أنها تشتمل على أنواع التوحيد الثلاثة: توحيد الربوبية، الألوهية، والأسماء والصفات.</li>
        </ul>
      `
    },
    fawaeed: {
      SurahFaidah: 'فوائد سورة الفاتحة',
      FaidaText: `
        <ul class="benefit-list">
          <li>الفاتحة ركن في كل ركعة من الصلاة.</li>
          <li>الاستعانة والتوكل واللجوء لله وحده في كل أمر.</li>
          <li>أهمية سؤال الله الهداية في كل صلاة.</li>
        </ul>
      `
    }
  },

  // ==========================================
  // ENGELSKA (en)
  // ==========================================
  en: {
    name: 'Surah Al-Fatiha',
    hint: {
      surahName: 'Insight from Surah Al-Fatiha',
      hintText: 'Always pray to Allah and ask Him for guidance, for He is the Guide to the Straight Path.'
    },
    tafseerSource: 'Tafsir Ibn Kathir',
    introSummary: 'Praising Allah ← Declaring servitude to Allah ← Concluding with supplication for guidance.',
    verses: [
      { number: 2, text: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ', translation: 'In the Name of Allah—the Most Compassionate, Most Merciful.', tafsir: '<b>All praise is due to Allah</b>: Praising Allah for His attributes and blessings, commanding His servants to praise Him. <br> <b>Lord of the worlds</b>: The Creator, Provider, Giver of life and death, and Sustainer of all creation.' },
      { number: 3, text: 'الرَّحْمَٰنِ الرَّحِيمِ', translation: 'the Most Compassionate, Most Merciful,', tafsir: '<b>The Entirely Merciful</b>: Possessor of general mercy for all creation. <br> <b>The Especially Merciful</b>: Possessor of specific mercy for believers.' },
      { number: 4, text: 'مَٰلِكِ يَوۡمِ ٱلدِّينِ',translation: 'Master of the Day of Judgment.',  tafsir: 'Master of the <b>Day of Judgment</b>, the Day when deeds are recompensed, rewarding the obedient and punishing the disobedient.' },
      { number: 5, text: 'إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ', translation: 'You ˹alone˺ we worship and You ˹alone˺ we ask for help.', tafsir: 'You alone we worship and You alone we ask for help. We do not worship nor seek help except from You, as all matters are in Your hands.' },
      { number: 6, text: 'ٱهۡدِنَا ٱلصِّرَٰطَ ٱلۡمُسۡتَقِيمَ',translation: 'Guide us along the Straight Path,',  tafsir: 'Guide us, direct us, and keep us firm on the Straight Path, the path of truth that leads to Your pleasure and Paradise.' },
      { number: 7, text: 'صِرَٰطَ ٱلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡ غَيۡرِ ٱلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ٱلضَّآلِّينَ', translation: 'the Path of those You have blessed—not those You are displeased with, or those who are astray.',  tafsir: '<b>The path of those You have blessed</b>: The path of the <b>Prophets</b>, the <b>Truthful</b>, the <b>Martyrs</b>, and the <b>Righteous</b>. <br> <b>Not of those who earned anger</b>: Those who knew the truth but abandoned it. <br> <b>Nor of those who are astray</b>: Those who were ignorant of the truth and strayed from it.' }
    ],
    rubtTassweerySections: [
      { title: '🕊️ Praising Allah', description: 'The Surah begins with praising and glorifying Allah, mentioning His grand attributes that bring peace to the heart, preparing the soul to turn sincerely to Him.', verseNumbers: [2, 3, 4] },
      { title: '🧎‍♂️ Devotion & Worship', description: 'After praise comes the declaration of complete servitude to Allah alone, and asking for His help in all matters.', verseNumbers: [5] },
      { title: '🌟 Seeking Guidance', description: 'We conclude by asking for the greatest need in life and the Hereafter: guidance to the Straight Path and avoiding the paths of destruction.', verseNumbers: [6, 7] }
    ],
    questions: [
      {
        question: 'Why is Surah Al-Fatiha called by this name?',
        answers: [
          { text: 'Because it was the first Surah revealed', isCorrect: false },
          { text: 'Because it opens prayers only', isCorrect: false },
          { text: 'Because it opens the Quran', isCorrect: true },
          { text: 'Because it is the last Surah in the Quran', isCorrect: false }
        ]
      },
      {
        question: 'What is the meaning of "Al-Shaytan Al-Rajeem"?',
        answers: [
          { text: 'One who loves good for people', isCorrect: false },
          { text: 'Expelled from Allah\'s mercy', isCorrect: true },
          { text: 'A strong believer', isCorrect: false },
          { text: 'A pious worshiper', isCorrect: false }
        ]
      },
      {
        question: 'What is the difference between "Ar-Rahman" and "Ar-Raheem"?',
        answers: [
          { text: 'They both mean the exact same thing', isCorrect: false },
          { text: 'Ar-Rahman is for believers, Ar-Raheem is for all creation', isCorrect: false },
          { text: 'Ar-Rahman is general mercy, Ar-Raheem is specific mercy for believers', isCorrect: true },
          { text: 'Ar-Raheem is more merciful than Ar-Rahman', isCorrect: false }
        ]
      },
      {
        question: 'What does "Maliki Yawm Ad-Deen" mean?',
        answers: [
          { text: 'Master of Friday', isCorrect: false },
          { text: 'Master of the Day of Judgment', isCorrect: true },
          { text: 'Master of the Dunya (worldly life)', isCorrect: false },
          { text: 'Master of the Quran', isCorrect: false }
        ]
      },
      {
        question: 'Who are "those who earned anger" (Al-Maghdubi Alayhim)?',
        answers: [
          { text: 'Those who knew the truth but did not act upon it', isCorrect: true },
          { text: 'Those who did not know the truth', isCorrect: false },
          { text: 'The believers', isCorrect: false },
          { text: 'The righteous', isCorrect: false }
        ]
      },
      {
        question: 'Who are "those who are astray" (Ad-Daalleen)?',
        answers: [
          { text: 'Those who knew the truth and left it', isCorrect: false },
          { text: 'Those who lacked knowledge of the truth and erred', isCorrect: true },
          { text: 'The Prophets', isCorrect: false },
          { text: 'The Martyrs', isCorrect: false }
        ]
      },
      {
        question: 'What does "Ameen" mean after reciting Al-Fatiha?',
        answers: [
          { text: 'Allah Almighty has spoken the truth', isCorrect: false },
          { text: 'O Allah, answer our prayer', isCorrect: true },
          { text: 'O Allah, forgive us', isCorrect: false },
          { text: 'It has no specific meaning', isCorrect: false }
        ]
      }
    ],
    benefit: {
      title: 'Benefit:',
      text: 'It is recommended for the reciter in prayer upon finishing <span class="highlight">Al-Fatiha</span> to say <strong>"Ameen"</strong>, which means: <em>O Allah, answer our prayer</em>.'
    },
    reminder: {
      title: 'Reminder:',
      content: `
        <strong>Basmalah</strong> following the Sunnah of the Prophet ﷺ <br>
        <strong>In application of the Hadith:</strong> Every important matter that does not begin with the name of Allah is severed or incomplete. <br>
        <strong>Severed (Abtar):</strong> <em>Cut off, lacking blessing or lasting effect.</em><br>
        <strong>Incomplete (Aqta'):</strong> <em>Deprived of good, does not reach full completion.</em>
      `,
      hadithSummary: '📜 View Hadith',
      hadithText: `
        Abu Hurairah (may Allah be pleased with him) reported that the Messenger of Allah ﷺ said: 
        (Every speech or important matter that does not open with the remembrance of Allah is severed - or he said: incomplete -) 
        Narrated by Imam Ahmad in "Al-Musnad".
      `
    },
    nezool: {
      dalel: 'Dear loved ones, we must learn that our religion comes from the Quran and Sunnah, and we should only accept religious statements backed by proof.',
      nezoolText: `
        <ul class="benefit-list">
          <li>It is a pillar of prayer; the prayer is invalid without it.</li>
          <li>It is the greatest Surah in the Quran.</li>
          <li>It is "The Seven Oft-Repeated Verses" (Al-Sab\' Al-Mathani).</li>
          <li>It encompasses all three types of Tawheed (Oneness of Allah).</li>
        </ul>
      `
    },
    fawaeed: {
      SurahFaidah: 'Benefits of Surah Al-Fatiha',
      FaidaText: `
        <ul class="benefit-list">
          <li>Al-Fatiha is a pillar in every rak\'ah of prayer.</li>
          <li>Seeking help, reliance, and refuge in Allah alone for every matter.</li>
          <li>The extreme importance of asking Allah for guidance in every prayer.</li>
        </ul>
      `
    }
  }
};