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
// DOM要素の取得
// ===================
const startScreen = document.getElementById("startScreen");
const checklistScreen = document.getElementById("checklistScreen");
const completionScreen = document.getElementById("completionScreen");
const planOptions = document.querySelectorAll(".plan-option");
console.log("Found plan options:", planOptions.length); // デバッグ用
const startButton = document.getElementById("startButton");
const progressInfo = document.getElementById("progressInfo");
const sectionTitle = document.getElementById("sectionTitle");
const checklistItems = document.getElementById("checklistItems");
const backButton = document.getElementById("backButton");
const nextButton = document.getElementById("nextButton");
const downloadPdf = document.getElementById("downloadPdf");

// ===================
// イベントリスナー
// ===================

// プラン選択
planOptions.forEach((option) => {
  option.addEventListener("click", function () {
    console.log("Plan option clicked:", this.dataset.plan); // デバッグ用
    
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
    }
    currentPlan = this.dataset.plan;

    // スタートボタンを有効化
    if (startButton) {
      startButton.classList.add("active");
      startButton.disabled = false;
    }
  });
});

// チェック開始
if (startButton) {
  startButton.addEventListener("click", function () {
    if (currentPlan) {
      startChecklist();
    }
  });
}

// 戻るボタン
if (backButton) {
  backButton.addEventListener("click", function () {
    if (currentSection > 0) {
      currentSection--;
      renderCurrentSection();
    } else {
      // 最初のセクションの場合、スタート画面に戻る
      showScreen("start");
      resetChecklist();
    }
  });
}

// 次へボタン
if (nextButton) {
  nextButton.addEventListener("click", function () {
    if (nextButton.classList.contains("active")) {
      currentSection++;
      if (currentSection >= currentItems.length) {
        showCompletionScreen();
      } else {
        renderCurrentSection();
      }
    }
  });
}

// PDF ダウンロード
if (downloadPdf) {
  downloadPdf.addEventListener("click", function () {
    // 実際の実装では、選択されたプランに応じてPDFファイルをダウンロード
    const pdfFile =
      currentPlan === "free" ? "free-plan-report.pdf" : "paid-plan-report.pdf";
    alert(
      `${pdfFile} をダウンロードします。\n（実装時は実際のPDFファイルへのリンクになります）`
    );
  });
}

// ===================
// 機能関数
// ===================

function showScreen(screen) {
  if (startScreen) startScreen.style.display = screen === "start" ? "block" : "none";
  if (checklistScreen) checklistScreen.style.display = screen === "checklist" ? "block" : "none";
  if (completionScreen) completionScreen.style.display = screen === "completion" ? "block" : "none";
}

function startChecklist() {
  currentItems = checklistData[currentPlan] || checklistData.free;
  currentSection = 0;
  checkedItems.clear();

  showScreen("checklist");
  renderCurrentSection();
}

function renderCurrentSection() {
  const section = currentItems[currentSection];

  // プログレス更新
  const totalItems = currentItems.reduce(
    (total, section) => total + section.items.length,
    0
  );
  const completedItems = checkedItems.size;
  if (progressInfo) {
    progressInfo.textContent = `残り ${totalItems - completedItems} チェック`;
  }

  // セクションタイトル更新
  if (sectionTitle) {
    sectionTitle.textContent = section.title;
  }

  // チェックリストアイテム生成
  if (checklistItems) {
    checklistItems.innerHTML = "";
  }
  section.items.forEach((item, index) => {
    const itemId = `${currentSection}-${index}`;
    const isChecked = checkedItems.has(itemId);

    const itemDiv = document.createElement("div");
    itemDiv.className = "checklist-item";
    itemDiv.innerHTML = `
                    <div class="custom-checkbox ${
                      isChecked ? "checked" : ""
                    }" data-item-id="${itemId}"></div>
                    <div class="item-text">
                        ${item.text}
                        ${item.tools
                          .map(
                            (tool) => `
                            <div class="tool-link">
                                <span class="info-icon">💡</span>
                                <span>${tool.text}</span>
                            </div>
                        `
                          )
                          .join("")}
                    </div>
                `;

    // チェックボックスイベント
    const checkbox = itemDiv.querySelector(".custom-checkbox");
    checkbox.addEventListener("click", function () {
      const itemId = this.dataset.itemId;
      if (checkedItems.has(itemId)) {
        checkedItems.delete(itemId);
        this.classList.remove("checked");
      } else {
        checkedItems.add(itemId);
        this.classList.add("checked");
      }
      updateNextButton();
    });

    if (checklistItems) {
      checklistItems.appendChild(itemDiv);
    }
  });

  updateNextButton();
}

function updateNextButton() {
  const currentSectionItems = currentItems[currentSection].items;
  const currentSectionChecked = currentSectionItems.filter((item, index) => {
    return checkedItems.has(`${currentSection}-${index}`);
  }).length;

  if (nextButton) {
    if (currentSectionChecked === currentSectionItems.length) {
      nextButton.classList.add("active");
    } else {
      nextButton.classList.remove("active");
    }
  }
}

function showCompletionScreen() {
  showScreen("completion");
}

function resetChecklist() {
  currentPlan = null;
  currentSection = 0;
  checkedItems.clear();
  
  if (startButton) {
    startButton.classList.remove("active");
    startButton.disabled = true;
  }

  // プラン選択をリセット
  planOptions.forEach((opt) => {
    const checkbox = opt.querySelector(".custom-checkbox");
    if (checkbox) {
      checkbox.classList.remove("checked");
    }
  });
}
