// src/serviceWorkerRegistration.js

// هذا ملف تسجيل Service Worker بسيط يمكنك استخدامه كما هو

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] هو localhost لـ IPv6.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 هو localhost IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // عنوان الـ SW
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // إذا كان الـ public URL من أصل مختلف، لا نسجل الـ SW.
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // تحقق من وجود SW إذا كنا على localhost.
        checkValidServiceWorker(swUrl, config);

        // إعلام المطور أن التطبيق يعمل في وضع SW.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "This web app is being served cache-first by a service worker."
          );
        });
      } else {
        // تسجيل الـ SW مباشرة.
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // تم تحديث المحتوى.
              console.log("New content is available; please refresh.");

              // نفذ وظيفة callback إذا وُجدت.
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // المحتوى مخزن للعمل offline لأول مرة.
              console.log("Content is cached for offline use.");

              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error("Error during service worker registration:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // تحقق من وجود ملف SW.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // إذا لم يوجد ملف SW، قم بإلغاء التسجيل.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // إذا وجد، سجل الـ SW.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
