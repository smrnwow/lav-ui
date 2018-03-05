import lavAvatar from './components/avatar/index.vue';
import lavBreadcrumbs from './components/breadcumbs/index.vue';
import lavButton from './components/button/index.vue';
import lavCard from './components/card/index.vue';
import lavCheckbox from './components/checkbox/index.vue';
import lavDropdown from './components/dropdown/index.vue';
import lavFileInput from './components/file-input/index.vue';
import lavGallery from './components/gallery/index.vue';
import lavGrid from './components/images-grid/index.vue';
import lavInfinityScroll from './components/infinity-scroll/index.vue';
import lavInput from './components/input/index.vue';
import lavModal from './components/modal/index.vue';
import lavNotification from './components/notification/index.js'; 
import lavPagination from './components/pagination/index.vue';
import lavProgress from './components/progress/index.vue';
import lavRadio from './components/radio/index.vue';
import lavSelect from './components/select/index.vue';
import lavTabs from './components/tabs/tabs.vue';
import lavTab from './components/tabs/tab.vue';
import lavTag from './components/tag/index.vue';
import lavTextarea from './components/textarea/index.vue';
import lavUpper from './components/upper/index.vue';

import lavContainer from './components/layout/container/index.vue';
import lavSidebar from './components/layout/sidebar/index.vue';
import lavContent from './components/layout/content/index.vue';








const LavUI = {
    lavAvatar,
    lavBreadcrumbs,
    lavButton,
    lavCard,
    lavCheckbox,
    lavDropdown,
    lavFileInput,
    lavGallery,
    lavGrid,
    lavInfinityScroll,
    lavInput,
    lavModal,
    lavNotification,
    lavPagination,
    lavProgress,
    lavRadio,
    lavSelect,
    lavTabs,
    lavTab,
    lavTag,
    lavTextarea,
    lavUpper,
 
    lavContainer,
    lavSidebar,
    lavContent,
 
    install(Vue) {
        Vue.component('lav-avatar', lavAvatar);
        Vue.component('lav-breadcrumbs', lavBreadcrumbs);
        Vue.component('lav-button', lavButton);
        Vue.component('lav-card', lavCard);
        Vue.component('lav-checkbox', lavCheckbox);
        Vue.component('lav-dropdown', lavDropdown);
        Vue.component('lav-file-input', lavFileInput);
        Vue.component('lav-gallery', lavGallery);
        Vue.component('lav-grid', lavGrid);
        Vue.component('lav-infinity-scroll', lavInfinityScroll);
        Vue.component('lav-input', lavInput);
        Vue.component('lav-modal', lavModal);
        Vue.component('lav-pagination', lavPagination);
        Vue.component('lav-progress', lavProgress);
        Vue.component('lav-radio', lavRadio);
        Vue.component('lav-select', lavSelect);
        Vue.component('lav-tabs', lavTabs);
        Vue.component('lav-tab', lavTab);
        Vue.component('lav-textarea', lavTextarea);
        Vue.component('lav-upper', lavUpper);

        Vue.component('lav-container', lavContainer);
        Vue.component('lav-sidebar', lavSidebar);
        Vue.component('lav-content', lavContent);
        
        
        // Vue.component('lav-notification', lavNotification);
        
        

        Vue.prototype.$lavNotify = lavNotification;
    }
};

// Automatically install Keen UI if Vue is available globally
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(LavUI);
}

export default LavUI;

export { lavAvatar };
export { lavBreadcrumbs };
export { lavButton };
export { lavCard };
export { lavCheckbox };
export { lavDropdown };
export { lavFileInput };
export { lavGallery };
export { lavGrid };
export { lavInfinityScroll };
export { lavInput };
export { lavModal };
export { lavNotification };
export { lavPagination };
export { lavProgress };
export { lavRadio };
export { lavSelect };
export { lavTabs };
export { lavTab };
export { lavTag };
export { lavTextarea };
export { lavUpper };

export { lavContainer };
export { lavSidebar };
export { lavContent };
