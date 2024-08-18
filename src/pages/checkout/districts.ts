const districts = [
    {
      name: 'ঢাকা',
      subdistricts: ['ধামরাই', 'কেরানীগঞ্জ', 'নবাবগঞ্জ', 'সাভার']
    },
    {
      name: 'ফরিদপুর',
      subdistricts: ['আলফাডাঙ্গা', 'বোয়ালমারী', 'চরভদ্রাসন', 'নগরকান্দা', 'সদরপুর', 'ভাঙ্গা', 'শহর']
    },
    {
      name: 'গাজীপুর',
      subdistricts: ['কালিয়াকৈর', 'কালিগঞ্জ', 'কাপাসিয়া', 'শ্রীপুর']
    },
    {
      name: 'গোপালগঞ্জ',
      subdistricts: ['কাশিয়ানী', 'কোটালিপাড়া', 'মুকসুদপুর', 'টুঙ্গিপাড়া']
    },
    {
      name: 'কিশোরগঞ্জ',
      subdistricts: ['অষ্টগ্রাম', 'বাজিতপুর', 'ভৈরব', 'হোসেনপুর', 'ইটনা', 'করিমগঞ্জ', 'কটিয়াদী', 'মিঠামইন', 'নিকলী', 'পাকুন্দিয়া', 'কিশোরগঞ্জ সদর', 'তাড়াইল']
    },
    {
      name: 'মানিকগঞ্জ',
      subdistricts: ['দৌলতপুর', 'ঘিওর', 'হরিরামপুর', 'শিবালয়', 'সিংগাইর']
    },
    {
      name: 'মুন্সীগঞ্জ',
      subdistricts: ['গজারিয়া', 'লোহজং', 'মুন্সীগঞ্জ সদর', 'সিরাজদিখান', 'শ্রীনগর', 'টঙ্গিবাড়ী']
    },
    {
      name: 'নারায়ণগঞ্জ',
      subdistricts: ['আড়াইহাজার', 'বন্দর', 'নারায়ণগঞ্জ সদর', 'রূপগঞ্জ', 'সোনারগাঁও']
    },
    {
      name: 'নরসিংদী',
      subdistricts: ['বেলাবো', 'মনোহরদী', 'পলাশ', 'রায়পুরা', 'শিবপুর']
    },
    {
      name: 'রাজবাড়ী',
      subdistricts: ['বালিয়াকান্দি', 'গোয়ালন্দ', 'পাংশা', 'রাজবাড়ী সদর']
    },
    {
      name: 'শরীয়তপুর',
      subdistricts: ['ভেদরগঞ্জ', 'ডামুড্যা', 'গোসাইরহাট', 'নড়িয়া', 'শরীয়তপুর সদর', 'জাজিরা']
    },
    {
      name: 'টাঙ্গাইল',
      subdistricts: ['বাসাইল', 'ভূঞাপুর', 'দেলদুয়ার', 'ঘাটাইল', 'গোপালপুর', 'মধুপুর', 'মির্জাপুর', 'নাগরপুর', 'সখিপুর', 'টাঙ্গাইল সদর']
    },
    {
      name: 'ফেনী',
      subdistricts: ['ছাগলনাইয়া', 'দাগনভূঞা', 'ফেনী সদর', 'ফুলগাজী', 'পরশুরাম', 'সোনাগাজী']
    },
    {
      name: 'লক্ষ্মীপুর',
      subdistricts: ['লক্ষ্মীপুর সদর', 'রায়পুর', 'রামগঞ্জ', 'রামগতি', 'কমলনগর']
    },
    {
      name: 'চাঁদপুর',
      subdistricts: ['চাঁদপুর সদর', 'ফরিদগঞ্জ', 'হাইমচর', 'হাজীগঞ্জ', 'কচুয়া', 'মতলব দক্ষিণ', 'মতলব উত্তর']
    },
    {
      name: 'কুমিল্লা',
      subdistricts: ['বরুড়া', 'ব্রাহ্মণপাড়া', 'বুড়িচং', 'চান্দিনা', 'চৌদ্দগ্রাম', 'দাউদকান্দি', 'দেবিদ্বার', 'হোমনা', 'লাকসাম', 'মুরাদনগর', 'নাঙ্গলকোট', 'কুমিল্লা সদর', 'তিতাস']
    },
    {
      name: 'নোয়াখালী',
      subdistricts: ['বেগমগঞ্জ', 'চাটখিল', 'হাতিয়া', 'কোম্পানীগঞ্জ', 'নোয়াখালী সদর', 'সেনবাগ', 'সুবর্ণচর']
    },
    {
      name: 'ব্রাহ্মণবাড়িয়া',
      subdistricts: ['বাঞ্ছারামপুর', 'ব্রাহ্মণবাড়িয়া সদর', 'কসবা', 'নাসিরনগর', 'নবীনগর', 'সরাইল', 'আশুগঞ্জ']
    },
    {
      name: 'কক্সবাজার',
      subdistricts: ['চকরিয়া', 'কক্সবাজার সদর', 'কুতুবদিয়া', 'মহেশখালী', 'রামু', 'টেকনাফ', 'উখিয়া', 'পেকুয়া']
    },
    {
      name: 'বান্দরবান',
      subdistricts: ['আলীকদম', 'বান্দরবান সদর', 'লামা', 'নাইক্ষ্যংছড়ি', 'রুমা', 'রোয়াংছড়ি', 'থানচি']
    },
    {
      name: 'চট্টগ্রাম',
      subdistricts: ['আনোয়ারা', 'বাঁশখালী', 'বোয়ালখালী', 'চন্দনাইশ', 'ফটিকছড়ি', 'হাটহাজারী', 'লোহাগাড়া', 'মিরসরাই', 'পটিয়া', 'রাঙ্গুনিয়া', 'রাউজান', 'সন্দ্বীপ', 'সীতাকুণ্ড']
    },
    {
      name: 'খাগড়াছড়ি',
      subdistricts: ['দীঘিনালা', 'খাগড়াছড়ি সদর', 'লক্ষ্মীছড়ি', 'মহালছড়ি', 'মানিকছড়ি', 'মাটিরাঙ্গা', 'পানছড়ি', 'রামগড়']
    },
    {
      name: 'রাঙ্গামাটি',
      subdistricts: ['বাঘাইছড়ি', 'বরকল', 'বরইছড়ি', 'কাপ্তাই', 'জুরাছড়ি', 'লংগদু', 'নানিয়ারচর', 'রাঙ্গামাটি সদর']
    },
    {
      name: 'বরগুনা',
      subdistricts: ['আমতলী', 'বামনা', 'বরগুনা সদর', 'বেতাগী', 'পাথরঘাটা', 'তালতলী']
    },
    {
      name: 'ভোলা',
      subdistricts: ['ভোলা সদর', 'বোরহানউদ্দিন', 'চরফ্যাশন', 'দৌলতখান', 'লালমোহন', 'মনপুরা', 'তজুমদ্দিন']
    },
    {
      name: 'ঝালকাঠি',
      subdistricts: ['ঝালকাঠি সদর', 'কাঁঠালিয়া', 'নলছিটি', 'রাজাপুর']
    },
    {
      name: 'পটুয়াখালী',
      subdistricts: ['বাউফল', 'দশমিনা', 'গলাচিপা', 'কলাপাড়া', 'মির্জাগঞ্জ', 'পটুয়াখালী সদর', 'রাঙ্গাবালী']
    },
    {
      name: 'পিরোজপুর',
      subdistricts: ['পিরোজপুর সদর', 'ভান্ডারিয়া', 'কাউখালী', 'নাজিরপুর', 'নেছারাবাদ', 'মঠবাড়িয়া', 'ইন্দুরকানী']
    },
    {
      name: 'বান্দরবান',
      subdistricts: ['আলীকদম', 'বান্দরবান সদর', 'লামা', 'নাইক্ষ্যংছড়ি', 'রুমা', 'রোয়াংছড়ি', 'থানচি']
    },
    {
      name: 'বগুড়া',
      subdistricts: ['আদমদিঘী', 'বগুড়া সদর', 'ধুনট', 'গাবতলী', 'কাহালু', 'নন্দীগ্রাম', 'শাজাহানপুর', 'শেরপুর', 'শিবগঞ্জ', 'সোনাতলা', 'সারিয়াকান্দি']
    },
    {
      name: 'জয়পুরহাট',
      subdistricts: ['আক্কেলপুর', 'জয়পুরহাট সদর', 'কালাই', 'খেতলাল', 'পাঁচবিবি']
    },
    {
      name: 'নওগাঁ',
      subdistricts: ['আত্রাই', 'বদলগাছী', 'ধামইরহাট', 'মান্দা', 'মহাদেবপুর', 'নওগাঁ সদর', 'নিয়ামতপুর', 'পত্নীতলা', 'পোরশা', 'রাণীনগর', 'সাপাহার']
    },
    {
      name: 'নাটোর',
      subdistricts: ['বাগাতিপাড়া', 'বড়াইগ্রাম', 'গুরুদাসপুর', 'লালপুর', 'নাটোর সদর', 'সিংড়া']
    },
    {
      name: 'চাঁপাইনবাবগঞ্জ',
      subdistricts: ['বদলগাছী', 'গোমস্তাপুর', 'নাচোল', 'চাঁপাইনবাবগঞ্জ সদর', 'শিবগঞ্জ']
    },
    {
      name: 'পাবনা',
      subdistricts: ['আটঘরিয়া', 'বেড়া', 'ভাঙ্গুড়া', 'চাটমোহর', 'ঈশ্বরদী', 'পাবনা সদর', 'ফরিদপুর', 'সুজানগর', 'সাঁথিয়া']
    },
    {
      name: 'রাজশাহী',
      subdistricts: ['বাঘা', 'বাগমারা', 'চারঘাট', 'দুর্গাপুর', 'গোদাগাড়ী', 'মোহনপুর', 'পবা', 'পুঠিয়া', 'তানোর']
    },
    {
      name: 'সিরাজগঞ্জ',
      subdistricts: ['বেলকুচি', 'চৌহালি', 'কাজিপুর', 'কামারখন্দ', 'রায়গঞ্জ', 'সদর', 'শাহজাদপুর', 'তাড়াশ', 'উল্লাপাড়া']
    },
    {
      name: 'দিনাজপুর',
      subdistricts: ['বীরগঞ্জ', 'বোচাগঞ্জ', 'চিরিরবন্দর', 'ফুলবাড়ী', 'ঘোড়াঘাট', 'হাকিমপুর', 'কাহারোল', 'খানসামা', 'নবাবগঞ্জ', 'পার্বতীপুর', 'বিরামপুর', 'দিনাজপুর সদর']
    },
    {
      name: 'গাইবান্ধা',
      subdistricts: ['ফুলছড়ি', 'গাইবান্ধা সদর', 'গোবিন্দগঞ্জ', 'পলাশবাড়ী', 'সাদুল্লাপুর', 'সাঘাটা', 'সুন্দরগঞ্জ']
    },
    {
      name: 'কুড়িগ্রাম',
      subdistricts: ['ভুরুঙ্গামারী', 'চিলমারী', 'ফুলবাড়ী', 'কুড়িগ্রাম সদর', 'নাগেশ্বরী', 'রাজারহাট', 'রৌমারী', 'উলিপুর']
    },
    {
      name: 'লালমনিরহাট',
      subdistricts: ['আদিতমারী', 'কালীগঞ্জ', 'হাতীবান্ধা', 'লালমনিরহাট সদর', 'পাটগ্রাম']
    },
    {
      name: 'নীলফামারী',
      subdistricts: ['ডিমলা', 'ডোমার', 'জলঢাকা', 'কিশোরগঞ্জ', 'নীলফামারী সদর', 'সৈয়দপুর']
    },
    {
      name: 'পঞ্চগড়',
      subdistricts: ['আটোয়ারী', 'বোদা', 'দেবীগঞ্জ', 'পঞ্চগড় সদর', 'তেতুলিয়া']
    },
    {
      name: 'রংপুর',
      subdistricts: ['বদরগঞ্জ', 'গঙ্গাচড়া', 'কাউনিয়া', 'মিঠাপুকুর', 'পীরগাছা', 'পীরগঞ্জ', 'রংপুর সদর', 'তারাগঞ্জ']
    },
    {
      name: 'ঠাকুরগাঁও',
      subdistricts: ['বালিয়াডাঙ্গী', 'হরিপুর', 'পীরগঞ্জ', 'রাণীশংকৈল', 'ঠাকুরগাঁও সদর']
    },
    {
      name: 'ময়মনসিংহ',
      subdistricts: ['ভালুকা', 'ধোবাউড়া', 'ফুলবাড়ীয়া', 'গফরগাঁও', 'গৌরীপুর', 'হালুয়াঘাট', 'ঈশ্বরগঞ্জ', 'ময়মনসিংহ সদর', 'মুক্তাগাছা', 'নান্দাইল', 'ফুলপুর', 'ত্রিশাল']
    },
    {
      name: 'জামালপুর',
      subdistricts: ['বকশীগঞ্জ', 'দেওয়ানগঞ্জ', 'ইসলামপুর', 'জামালপুর সদর', 'মেলান্দহ', 'মাদারগঞ্জ']
    },
    {
      name: 'নেত্রকোনা',
      subdistricts: ['আটপাড়া', 'বারহাট্টা', 'দুর্গাপুর', 'কলমাকান্দা', 'কেন্দুয়া', 'মদন', 'মোহনগঞ্জ', 'নেত্রকোনা সদর', 'পূর্বধলা']
    },
    {
      name: 'শেরপুর',
      subdistricts: ['ঝিনাইগাতী', 'নকলা', 'নালিতাবাড়ী', 'শেরপুর সদর', 'শ্রীবরদী']
    },
    {
      name: 'হবিগঞ্জ',
      subdistricts: ['বাহুবল', 'চুনারুঘাট', 'হবিগঞ্জ সদর', 'লাখাই', 'মাধবপুর', 'নবীগঞ্জ', 'শায়েস্তাগঞ্জ']
    },
    {
      name: 'মৌলভীবাজার',
      subdistricts: ['বড়লেখা', 'কমলগঞ্জ', 'কুলাউড়া', 'মৌলভীবাজার সদর', 'রাজনগর', 'শ্রীমঙ্গল', 'জুড়ী']
    },
    {
      name: 'সুনামগঞ্জ',
      subdistricts: ['ছাতক', 'দক্ষিণ সুনামগঞ্জ', 'দিরাই', 'ধর্মপাশা', 'জগন্নাথপুর', 'তাহিরপুর', 'দোয়ারাবাজার', 'বিশ্বম্ভরপুর', 'শাল্লা']
    },
    {
      name: 'সিলেট',
      subdistricts: ['বালাগঞ্জ', 'বিয়ানীবাজার', 'বিশ্বনাথ', 'কোম্পানীগঞ্জ', 'ফেঞ্চুগঞ্জ', 'গোলাপগঞ্জ', 'গোয়াইনঘাট', 'জৈন্তাপুর', 'কানাইঘাট', 'জকিগঞ্জ']
    },
    {
      name: 'বাগেরহাট',
      subdistricts: ['বাগেরহাট সদর', 'চিতলমারী', 'ফকিরহাট', 'কচুয়া', 'মোল্লাহাট', 'মোড়েলগঞ্জ', 'মোংলা', 'রামপাল', 'শরণখোলা']
    },
    {
      name: 'চুয়াডাঙ্গা',
      subdistricts: ['আলমডাঙ্গা', 'চুয়াডাঙ্গা সদর', 'দামুড়হুদা', 'জীবননগর']
    },
    {
      name: 'যশোর',
      subdistricts: ['অভয়নগর', 'বাঘারপাড়া', 'চৌগাছা', 'ঝিকরগাছা', 'কেশবপুর', 'মণিরামপুর', 'শার্শা']
    },
    {
      name: 'ঝিনাইদহ',
      subdistricts: ['ঝিনাইদহ সদর', 'কোটচাঁদপুর', 'কালীগঞ্জ', 'হরিণাকুণ্ডু', 'মহেশপুর', 'শৈলকুপা']
    },
    {
      name: 'খুলনা',
      subdistricts: ['বটিয়াঘাটা', 'দাকোপ', 'ডুমুরিয়া', 'কয়রা', 'পাইকগাছা', 'ফুলতলা', 'রূপসা', 'তেরোখাদা']
    },
    {
      name: 'কুষ্টিয়া',
      subdistricts: ['ভেড়ামারা', 'কুমারখালী', 'কুষ্টিয়া সদর', 'দৌলতপুর', 'মিরপুর', 'খোকসা']
    },
    {
      name: 'মাগুরা',
      subdistricts: ['মাগুরা সদর', 'মহম্মদপুর', 'শালিখা', 'শ্রীপুর']
    },
    {
      name: 'মেহেরপুর',
      subdistricts: ['মুজিবনগর', 'গাংনী', 'মেহেরপুর সদর']
    },
    {
      name: 'নড়াইল',
      subdistricts: ['লোহাগড়া', 'নড়াইল সদর', 'কালিয়া']
    },
    {
      name: 'সাতক্ষীরা',
      subdistricts: ['আশাশুনি', 'দেবহাটা', 'কলারোয়া', 'কালীগঞ্জ', 'শ্যামনগর', 'সাতক্ষীরা সদর', 'তালা']
    },
    {
      name: 'বাগেরহাট',
      subdistricts: ['বাগেরহাট সদর', 'চিতলমারী', 'ফকিরহাট', 'কচুয়া', 'মোল্লাহাট', 'মোড়েলগঞ্জ', 'মোংলা', 'রামপাল', 'শরণখোলা']
    }
  ];

  export default districts