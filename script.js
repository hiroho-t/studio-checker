// ===================
// 状態管理
// ===================
let currentPlan = null;

// ===================
// DOM要素の取得
// ===================
const planOptions = document.querySelectorAll(".plan-option");
const startButton = document.getElementById("startButton");

// ===================
// プラン選択機能
// ===================
planOptions.forEach((option) => {
  option.addEventListener("click", function () {
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

// ===================
// スタートボタン機能
// ===================
if (startButton) {
  startButton.addEventListener("click", function () {
    if (currentPlan) {
      alert(`選択されたプラン: ${currentPlan === 'free' ? '無料のFreeプラン（全8問）' : '有料プランのいずれか（全11問）'}`);
    }
  });
}