const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.style.visibility = 'visible'
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        // deferred prompt isn't avaialble
        return;
    }
    //    show the install prompt
    promptEvent.prompt();
    // reset the deferred prompt variable prompt() can onlu be called once
    window.deferredPrompt = null;
    butInstall.setAttribute('hidden', true);
    butInstall.textContent = 'Installed!';
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('Success 👍', 'appinstalled', event)

    window.deferredPrompt = null;
});
