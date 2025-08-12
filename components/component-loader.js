/**
 * 共通コンポーネントローダー
 * HTML、CSS、JSのみを使用してコンポーネントを読み込む
 */

class ComponentLoader {
  constructor() {
    this.components = {};
    this.fallbackComponents = {
      header: `<div class="header">
  <h1 id="pageTitle">Studio 公開チェッカー</h1>
  <p class="subtitle" id="pageSubtitle">
    Studio で作成したサイトを公開する前に、チェックを行いましょう。
  </p>
  <div class="progress-info" id="progressInfo" style="display: none">
    残り 11 チェック
  </div>
</div>`,
      footer: `<div class="footer">
  <div class="footer-links">
    <a href="index.html">ホーム</a>
    <a href="usage.html">使い方</a>
    <a href="company.html">運営会社</a>
  </div>
  <p class="copyright">© StartWith Inc.</p>
</div>`
    };
  }

  /**
   * コンポーネントを読み込む
   * @param {string} componentName - コンポーネント名
   * @param {string} targetId - 挿入先の要素ID
   * @param {Object} options - オプション設定
   */
  async loadComponent(componentName, targetId, options = {}) {
    try {
      const response = await fetch(`components/${componentName}.html`);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${componentName}`);
      }

      let html = await response.text();

      // オプションに基づいてHTMLをカスタマイズ
      if (options.title) {
        html = html.replace(
          'id="pageTitle">Studio 公開チェッカー',
          `id="pageTitle">${options.title}`
        );
      }

      if (options.subtitle) {
        html = html.replace(
          'id="pageSubtitle">Studio で作成したサイトを公開する前に、チェックを行いましょう。',
          `id="pageSubtitle">${options.subtitle}`
        );
      }

      if (options.showProgress !== undefined) {
        const progressElement = html.match(/id="progressInfo"[^>]*>/);
        if (progressElement) {
          html = html.replace(
            'style="display: none;"',
            options.showProgress ? "" : 'style="display: none;"'
          );
        }
      }

      if (options.progressText) {
        html = html.replace("残り 11 チェック", options.progressText);
      }

      // ターゲット要素に挿入
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.innerHTML = html;
        this.components[componentName] = html;
      } else {
        console.error(`Target element not found: ${targetId}`);
      }
    } catch (error) {
      console.warn("Component loading failed, using fallback:", error.message);
      this.loadFallbackComponent(componentName, targetId, options);
    }
  }

  /**
   * フォールバックコンポーネントを読み込む
   * @param {string} componentName - コンポーネント名
   * @param {string} targetId - 挿入先の要素ID
   * @param {Object} options - オプション設定
   */
  loadFallbackComponent(componentName, targetId, options = {}) {
    let html = this.fallbackComponents[componentName];
    
    if (!html) {
      console.error(`Fallback component not found: ${componentName}`);
      return;
    }

    // オプションに基づいてHTMLをカスタマイズ
    if (options.title) {
      html = html.replace(
        'id="pageTitle">Studio 公開チェッカー',
        `id="pageTitle">${options.title}`
      );
    }

    if (options.subtitle) {
      html = html.replace(
        'id="pageSubtitle">Studio で作成したサイトを公開する前に、チェックを行いましょう。',
        `id="pageSubtitle">${options.subtitle}`
      );
    }

    if (options.showProgress !== undefined) {
      const progressElement = html.match(/id="progressInfo"[^>]*>/);
      if (progressElement) {
        html = html.replace(
          'style="display: none;"',
          options.showProgress ? "" : 'style="display: none;"'
        );
      }
    }

    if (options.progressText) {
      html = html.replace("残り 11 チェック", options.progressText);
    }

    // ターゲット要素に挿入
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.innerHTML = html;
      this.components[componentName] = html;
    } else {
      console.error(`Target element not found: ${targetId}`);
    }
  }

  /**
   * ヘッダーを読み込む
   * @param {Object} options - ヘッダーのオプション
   */
  async loadHeader(options = {}) {
    await this.loadComponent("header", "header-container", options);
  }

  /**
   * フッターを読み込む
   */
  async loadFooter() {
    await this.loadComponent("footer", "footer-container");
  }

  /**
   * ページ全体を初期化（ヘッダーとフッターを読み込む）
   * @param {Object} options - ページオプション
   */
  async initPage(options = {}) {
    await this.loadHeader(options);
    await this.loadFooter();
  }
}

// グローバルインスタンスを作成
window.componentLoader = new ComponentLoader();
