import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: `${import.meta.env.VITE_SENTRY_DSN}`,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
    // Use the default strategy, an alias for `feedbackSyncIntegration`
    // https://docs.sentry.io/platforms/javascript/guides/react/user-feedback/configuration/#crash-report-modal
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: 'light',
      showName: true,
      showEmail: true,
      enableScreenshot: true,
      isNameRequired: true,
      isEmailRequired: true,
      triggerLabel: '不具合を報告',
      triggerAriaLabel: '不具合を報告',
      formTitle: '不具合報告フォーム',
      nameLabel: 'お名前',
      namePlaceholder: 'お名前を入力してください',
      emailLabel: 'メールアドレス',
      emailPlaceholder: 'メールアドレスを入力してください',
      messageLabel: '不具合の詳細',
      isRequiredLabel: '（必須）',
      messagePlaceholder: '不具合の詳細を入力してください',
      addScreenshotButtonLabel: 'スクリーンショットを追加',
      removeScreenshotButtonLabel: 'スクリーンショットを削除',
      submitButtonLabel: '送信',
      cancelButtonLabel: 'キャンセル',
      successMessageText: 'ご協力していただき、ありがとうございました！',
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/pay-crew\.yukiosada\.work\//],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  // Enable logs to be sent to Sentry
  enableLogs: true,
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
