function ShellFilter({ id }) {
  return (
    <defs>
      <filter id={id} x="-12%" y="-18%" width="124%" height="140%">
        <feDropShadow
          dx="0"
          dy="7"
          stdDeviation="7"
          floodColor="#171918"
          floodOpacity=".15"
        />
      </filter>
    </defs>
  );
}

export function PageFrameContour({ variant }) {
  const isSolutions = variant === "solutions";
  const isWork = variant === "work";
  const isAton = variant === "aton";
  const viewBox = isSolutions
    ? "0 0 1504 942"
    : isWork || isAton
      ? "0 0 1504 945"
      : "0 0 1504 817";
  const surfacePath = isSolutions
    ? "M34 94C92 68 178 54 282 38C422 18 540 10 660 25C779 40 837 82 945 99C1057 120 1179 76 1348 72C1442 70 1490 91 1496 126V596C1496 693 1439 763 1339 823C1202 906 1039 936 850 940H360C258 940 179 880 90 820C31 780 10 720 10 641Z"
    : isWork
      ? "M35 105C89 77 180 61 286 38C421 9 545 -8 659 11C782 31 829 81 949 103C1061 123 1188 83 1354 80C1446 79 1491 98 1497 137V738C1497 812 1461 848 1396 848H982C932 848 895 865 872 909C858 934 833 943 797 943H113C46 943 11 906 11 838V673C11 642 24 614 26 585C28 559 13 540 11 514V208C11 158 15 125 35 105Z"
      : isAton
        ? "M35 105C89 77 180 61 286 38C421 9 545 -8 659 11C782 31 829 81 949 103C1061 123 1188 83 1354 80C1446 79 1491 98 1497 137V824C1497 902 1459 941 1390 941H113C46 941 11 904 11 837V671C11 642 24 613 26 584C28 559 13 540 11 514V208C11 158 15 125 35 105Z"
        : "M34 90C90 65 176 49 282 29C422 2 540-12 660 5C779 22 837 79 945 99C1057 120 1179 76 1348 72C1442 70 1490 91 1496 126V694C1496 776 1456 815 1387 815H110C43 815 10 778 10 711Z";
  const highlightPath = isSolutions
    ? "M36 94C94 70 180 57 283 41C422 21 540 13 660 28C779 43 838 85 945 102C1058 123 1180 79 1348 75C1440 73 1486 93 1492 127"
    : isWork || isAton
      ? "M38 105C92 79 181 64 287 41C421 12 545 -5 659 14C782 34 830 84 949 106C1062 126 1189 86 1354 83C1444 82 1487 100 1493 138"
      : "M36 90C92 67 178 52 283 32C422 5 540-9 660 8C779 25 838 82 945 102C1058 123 1180 79 1348 75C1440 73 1486 93 1492 127";

  return (
    <svg
      className={`page-frame-contour page-frame-contour--${variant}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <ShellFilter id={`${variant}-frame-shadow`} />
      <path
        className="page-frame-contour__surface"
        filter={`url(#${variant}-frame-shadow)`}
        d={surfacePath}
      />
      <path
        className="page-frame-contour__highlight"
        d={highlightPath}
      />
    </svg>
  );
}

export function WorkContour() {
  return (
    <svg
      className="work-contour"
      viewBox="0 0 1374 392"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <ShellFilter id="work-index-shadow" />
      <path
        className="work-contour__surface"
        filter="url(#work-index-shadow)"
        d="M64 26C128 1 256 -3 384 3C503 8 578 32 626 109C649 146 671 154 696 138C725 113 754 83 808 77C875 69 921 102 957 153C980 186 1008 191 1028 151C1053 102 1099 86 1166 88C1267 91 1328 146 1340 235C1353 329 1285 382 1199 382C1129 382 1083 348 1049 302C1026 271 1004 276 981 313C947 368 890 390 818 387C749 385 702 353 670 306C649 276 624 279 604 309C557 379 481 390 337 390C151 390 44 332 23 210C8 123 15 47 64 26Z"
      />
      <path
        className="work-contour__highlight"
        d="M67 30C130 6 257 2 383 8C500 13 574 36 621 112C647 153 674 161 701 143"
      />
    </svg>
  );
}

export function MethodContour() {
  return (
    <svg
      className="method-contour"
      viewBox="0 0 1440 512"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <ShellFilter id="method-shell-shadow" />

      <path
        className="contour-surface contour-surface--keep"
        d="M8 285C8 186 78 113 178 113C304 113 386 158 482 178C535 189 575 154 604 165C625 178 628 220 628 276C628 332 610 390 575 427C500 476 410 493 240 493C96 493 8 430 8 326Z"
      />
      <path
        className="contour-highlight"
        d="M13 283C14 190 80 121 179 121C302 121 385 165 481 185C538 197 575 162 604 173"
      />

      <path
        className="contour-surface contour-surface--rebuild"
        d="M793 190C840 184 883 148 928 110C1011 39 1087 8 1204 8C1333 8 1427 76 1432 217L1432 329C1425 452 1334 507 1218 507C1110 507 1025 470 938 427C914 405 902 379 887 350C876 328 882 312 902 300C927 285 935 269 929 247C922 218 850 197 793 190Z"
      />
      <path
        className="contour-jade-rim"
        d="M796 186C840 178 882 143 925 106C1009 34 1087 3 1205 3C1337 3 1435 73 1438 217L1438 331C1430 458 1337 513 1217 513C1107 513 1019 476 932 432"
      />

      <path
        className="contour-surface contour-surface--remove"
        d="M552 177C601 174 625 189 652 210C687 238 724 244 760 225C793 209 823 213 838 239C854 264 854 292 836 312C823 327 805 332 804 345C802 358 820 367 833 377C850 390 846 404 830 411C807 425 775 415 735 400C700 384 674 371 646 360C617 348 591 365 567 380C605 350 628 320 628 285C628 232 621 194 552 177Z"
      />
      <path
        className="contour-coral-rim"
        d="M512 177C567 177 588 200 588 238C588 258 570 270 512 270C570 270 588 287 588 309C588 348 565 389 512 411"
      />
      <path
        className="contour-coral-rim"
        d="M900 177C853 180 834 202 834 238C834 258 853 270 900 270C853 270 834 287 834 309C834 349 856 389 900 411"
      />
    </svg>
  );
}

function FlowTube({ d }) {
  return (
    <>
      <path className="manifold-tube manifold-tube--edge" d={d} />
      <path className="manifold-tube manifold-tube--surface" d={d} />
      <path className="manifold-tube manifold-tube--highlight" d={d} />
    </>
  );
}

export function SolutionContour() {
  return (
    <svg
      className="solution-contour"
      viewBox="0 0 1440 500"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <ShellFilter id="solution-shell-shadow" />
      <g filter="url(#solution-shell-shadow)">
        <FlowTube d="M88 248H597" />
        <FlowTube d="M595 248C626 216 620 164 675 121C718 87 761 82 818 82H1289" />
        <FlowTube d="M595 248C632 286 638 374 699 417H1290" />
      </g>
      <path className="manifold-bridge" d="M592 248H744" />
      <path className="manifold-bridge manifold-bridge--short" d="M590 248H628" />
    </svg>
  );
}

export function CatalogueContour() {
  return (
    <svg
      className="catalogue-contour"
      viewBox="0 0 1376 496"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <ShellFilter id="catalogue-shell-shadow" />
      <path
        className="catalogue-contour__surface"
        filter="url(#catalogue-shell-shadow)"
        d="M5 72C5 57 26 48 56 48H321C369 48 390 77 407 115C421 147 443 162 468 151C493 140 507 118 535 118C581 118 615 155 615 204V319C615 383 563 430 500 430H47C20 430 5 411 5 384Z"
      />
      <path
        className="catalogue-contour__highlight"
        d="M10 70C10 57 29 53 56 53H320C365 53 385 81 402 118C417 150 441 168 469 157"
      />
      <path className="catalogue-contour__bridge" d="M566 247H676" />
    </svg>
  );
}
