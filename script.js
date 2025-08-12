const checklistData = {
  free: [
    {
      title: "文章のチェックをしましょう。",
      items: [
        {
          text: "各ページで「誤字脱字」は、ありませんか？",
          tools: [
            {
              text: "「誤字脱字」で、おすすめの無料チェックツールはこちら。",
              link: "#",
            },
          ],
        },
        {
          text: "各ページで「表記揺れ」は、ありませんか？",
          tools: [
            {
              text: "「表記揺れ」で、おすすめの無料チェックツールはこちら。",
              link: "#",
            },
          ],
        },
      ],
    },
    {
      title: "画像のチェックをしましょう。",
      items: [
        {
          text: "画像のalt属性は設定されていますか？",
          tools: [],
        },
        {
          text: "ファビコンは設定されていますか？",
          tools: [],
        },
      ],
    },
    {
      title: "SEOのチェックをしましょう。",
      items: [
        {
          text: "各ページのタイトルタグは適切ですか？",
          tools: [],
        },
        {
          text: "各ページのメタディスクリプションは設定されていますか？",
          tools: [],
        },
      ],
    },
    {
      title: "最終チェック",
      items: [
        {
          text: "レスポンシブデザインは適切に動作しますか？",
          tools: [],
        },
        {
          text: "お問い合わせフォームは正常に動作しますか？",
          tools: [],
        },
      ],
    },
  ],
};

// 有料プランデータの設定
checklistData.paid = [
  ...checklistData.free,
  {
    title: "高度なSEOチェック",
    items: [
      {
        text: "構造化データは適切に設定されていますか？",
        tools: [],
      },
      {
        text: "サイトマップは生成・送信されていますか？",
        tools: [],
      },
      {
        text: "ページ速度は最適化されていますか？",
        tools: [],
      },
    ],
  },
];

// ===================
// 状態管理
// ===================
let currentPlan = null;
let currentSection = 0;
let currentItems = [];
let checkedItems = new Set();

// ===================
// DOM要素の取得（基本的なもののみ）
// ===================
console.log("Getting DOM elements...");

const planOptions = document.querySelectorAll(".plan-option");
console.log("Found plan options:", planOptions.length);

const startButton = document.getElementById("startButton");
console.log("Start button:", startButton);

// ===================
// プラン選択機能
// ===================
if (planOptions.length > 0) {
  planOptions.forEach((option, index) => {
    console.log(`Setting up option ${index}:`, option);
    
    if (option) {
      option.addEventListener("click", function () {
        console.log("Plan clicked:", this.dataset.plan);
        
        // 他の選択を解除
        planOptions.forEach((opt) => {
          const checkbox = opt.querySelector(".custom-checkbox");
          if (checkbox) {
            checkbox.classList.remove("checked");
          }
        });

        // 選択されたプランをマーク
        const selectedCheckbox = this.querySelector(".custom-checkbox");
        if (selectedCheckbox) {
          selectedCheckbox.classList.add("checked");
          console.log("Added checked class to:", selectedCheckbox);
        }
        
        currentPlan = this.dataset.plan;
        console.log("Selected plan:", currentPlan);

        // スタートボタンを有効化
        if (startButton) {
          startButton.classList.add("active");
          startButton.disabled = false;
          console.log("Start button enabled");
        }
      });
    }
  });
} else {
  console.error("No plan options found");
}

// ===================
// スタートボタン機能
// ===================
if (startButton) {
  startButton.addEventListener("click", function () {
    if (currentPlan) {
      console.log("Starting checklist for plan:", currentPlan);
      alert(`チェックリストを開始します（プラン: ${currentPlan}）`);
    }
  });
} else {
  console.error("Start button not found");
}