import lavGallery from './components/gallery/index.vue';
import lavTabs from './components/tabs/tabs.vue';
import lavTab from './components/tabs/tab.vue';
import lavButton from './components/button/index.vue';
import lavContainer from './components/layout/container/index.vue';
import lavSidebar from './components/layout/sidebar/index.vue';
import lavContent from './components/layout/content/index.vue';
import lavSelect from './components/select/index.vue';
import lavCheckbox from './components/checkbox/index.vue';
import lavNotification from './components/notification/index.js'; 
import lavDropdown from './components/dropdown/index.vue';
import lavInput from './components/input/index.vue';
import lavAvatar from './components/avatar/index.vue';


const LavUI = {
    lavGallery,
    lavTabs,
    lavTab,
    lavContainer,
    lavSidebar,
    lavContent,
    lavSelect,
    lavButton,
    lavCheckbox,
    lavNotification,
    lavDropdown,
    lavInput,
    lavAvatar,

    install(Vue) {
        Vue.component('lav-gallery', lavGallery);
        Vue.component('lav-tabs', lavTabs);
        Vue.component('lav-tab', lavTab);
        Vue.component('lav-container', lavContainer);
        Vue.component('lav-sidebar', lavSidebar);
        Vue.component('lav-content', lavContent);
        Vue.component('lav-select', lavSelect);
        Vue.component('lav-button', lavButton);
        Vue.component('lav-checkbox', lavCheckbox);
        Vue.component('lav-notification', lavNotification);
        Vue.component('lav-dropdown', lavDropdown);
        Vue.component('lav-input', lavInput);
        Vue.component('lav-avatar', lavAvatar);

        Vue.prototype.$lavNotify = lavNotification;
    }
};

// Automatically install Keen UI if Vue is available globally
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(LavUI);
}

export default LavUI;

export { lavGallery };
export { lavTabs };
export { lavTab };
export { lavContainer };
export { lavSidebar };
export { lavContent };
export { lavSelect };
export { lavButton };
export { lavCheckbox };
export { lavNotification };
export { lavDropdown };
export { lavInput };
export { lavAvatar };
