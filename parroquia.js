const svg=document.querySelector('.parroquia');
if(svg){
  svg.setAttribute('viewBox','0 0 720 820');
  svg.innerHTML=`
  <g fill="none" stroke="currentColor" stroke-width="1.22" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
    <!-- ground / plaza -->
    <path d="M78 760H642" opacity=".42"/>
    <path d="M86 760c48-38 86-51 124-50 51 2 79 29 119 27 43-2 72-37 119-37 46 0 72 32 111 31 31 0 54-17 83-32" opacity=".20"/>

    <!-- central nave -->
    <path d="M300 760V370L360 267L420 370V760"/>
    <path d="M300 370H420" opacity=".65"/>
    <path d="M314 370L360 290L406 370" opacity=".65"/>
    <circle cx="360" cy="407" r="32" opacity=".56"/>
    <circle cx="360" cy="407" r="20" opacity=".28"/>
    <path d="M328 760V588c0-46 32-78 32-78s32 32 32 78v172"/>
    <path d="M340 588c0-29 20-51 20-51s20 22 20 51" opacity=".55"/>
    <path d="M319 468H401M311 484H409" opacity=".36"/>

    <!-- left main tower -->
    <path d="M207 760V442H302V760"/>
    <path d="M218 442V294H291V442"/>
    <path d="M230 294V178H279V294"/>
    <path d="M238 178L255 82L271 178"/>
    <path d="M247 120h16M255 82V57M247 65h16"/>
    <path d="M218 442H291M230 294H279M238 178H271" opacity=".65"/>
    <path d="M225 432c0-43 29-70 29-70s29 27 29 70M239 286c0-34 16-55 16-55s16 21 16 55" opacity=".74"/>
    <path d="M220 329h69M224 319h61" opacity=".30"/>

    <!-- right main tower -->
    <path d="M418 760V442H513V760"/>
    <path d="M429 442V294H502V442"/>
    <path d="M441 294V178H490V294"/>
    <path d="M449 178L466 82L482 178"/>
    <path d="M458 120h16M466 82V57M458 65h16"/>
    <path d="M429 442H502M441 294H490M449 178H482" opacity=".65"/>
    <path d="M436 432c0-43 29-70 29-70s29 27 29 70M450 286c0-34 16-55 16-55s16 21 16 55" opacity=".74"/>
    <path d="M431 329h69M435 319h61" opacity=".30"/>

    <!-- intermediate pinnacles -->
    <path d="M174 760V520H207M174 520h33"/>
    <path d="M181 520V390H200V520"/>
    <path d="M184 390L191 345L198 390"/>
    <path d="M513 760H546V520M513 520h33"/>
    <path d="M520 520V390H539V520"/>
    <path d="M523 390L530 345L537 390"/>

    <!-- outer side towers -->
    <path d="M112 760V565H174V760"/>
    <path d="M124 565V468H161V565"/>
    <path d="M130 468L142 393L155 468"/>
    <path d="M546 760V565H608V760"/>
    <path d="M559 565V468H596V565"/>
    <path d="M565 468L578 393L590 468"/>

    <!-- pointed openings -->
    <path d="M126 760V658c0-30 17-51 17-51s17 21 17 51v102" opacity=".68"/>
    <path d="M224 760V594c0-38 31-64 31-64s31 26 31 64v166" opacity=".72"/>
    <path d="M435 760V594c0-38 31-64 31-64s31 26 31 64v166" opacity=".72"/>
    <path d="M560 760V658c0-30 17-51 17-51s17 21 17 51v102" opacity=".68"/>

    <!-- tracery / vertical rhythm -->
    <path d="M191 345V324M184 332h14M530 345V324M523 332h14" opacity=".55"/>
    <path d="M142 393V369M135 379h14M578 393V369M571 379h14" opacity=".50"/>
    <path d="M302 503H418M300 520H420" opacity=".27"/>
    <path d="M208 491h94M418 491h95" opacity=".24"/>

    <!-- central finial -->
    <path d="M360 267V224M351 239h18" opacity=".72"/>
  </g>`;
}
