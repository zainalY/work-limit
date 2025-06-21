window.OneSignalDeferred = window.OneSignalDeferred || [];
OneSignalDeferred.push(async function (OneSignal) {
    await OneSignal.init({
        appId: "a0c9da22-7697-4332-af58-c5d61c80ba72",
        safari_web_id: "web.onesignal.auto.48c84a0b-cc60-468f-93c1-13b193c27b88",
        notifyButton: {
            enable: true,
        },
    });
});