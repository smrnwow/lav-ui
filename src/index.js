import lavAvatar from './components/avatar/index.vue';
import lavBreadcrumbs from './components/breadcrumbs/index.vue';
import lavButton from './components/button/index.vue';
import lavCard from './components/card/index.vue';
import lavCheckbox from './components/checkbox/index.vue';
import lavCheckboxGroup from './components/checkbox-group/index.vue';
import lavDivider from './components/divider/index.vue';


//dropdown
import lavDropdown from './components/dropdown';
import lavDropdownMenu from './components/dropdown/menu';
import lavDropdownMenuItem from './components/dropdown/menu-item';


import lavFileInput from './components/file-input/index.vue';
import lavGallery from './components/gallery/gallery.vue';
import lavGrid from './components/images-grid/index.vue';
import lavInfinityScroll from './components/infinity-scroll/index.vue';

import lavIcon from './components/icon';

//inputs
import lavTextInput from './components/text-input';
import lavPasswordInput from './components/password-input';

//loader
import lavLoader from './components/loader';

import lavModal from './components/modal/modal.vue';
import lavPagination from './components/pagination/index.vue';
import lavProgress from './components/progress/index.vue';
import lavRadio from './components/radio/index.vue';
import lavRadioGroup from './components/radio-group/index.vue';
import lavSelect from './components/select/index.vue';
import lavMenu from './components/menu';
import lavMenuThree from './components/menu/three';
import lavMenuItem from './components/menu/item';
import lavMenuDivider from './components/menu/divider';
import lavSwitch from './components/switch/index.vue';
import lavTabs from './components/tabs/tabs.vue';
import lavTab from './components/tabs/tab.vue';
import lavTag from './components/tag/index.vue';
import lavTextarea from './components/textarea/index.vue';
import lavTooltip from './components/tooltip/index.vue';
import lavUpper from './components/upper/index.vue';

import lavContainer from './components/layout/container/index.vue';
import lavSidebar from './components/layout/sidebar/index.vue';
import lavContent from './components/layout/content/index.vue';

import progressController from './components/progress/index.js';
import modalController from './components/modal/index.js';
import galleryController from './components/gallery/index.js';
import notificationController from './components/notification/index.js';

//directives
import lavRipple from './directives/ripple/index.js';

//helpers
import lavImagePreload from './helpers/image-preload';


const LavUI = {
    lavAvatar,
    lavBreadcrumbs,
    lavButton,
    lavCard,
    lavCheckbox,
    lavCheckboxGroup,
    lavDivider,
    lavDropdown,
    lavDropdownMenu,
    lavDropdownMenuItem,
    lavFileInput,
    lavGallery,
    lavGrid,
    lavIcon,
    lavInfinityScroll,
    lavTextInput,
    lavPasswordInput,
    lavModal,
    notificationController,
    lavPagination,
    lavProgress,
    lavRadio,
    lavRadioGroup,
    lavSelect,
    lavMenu,
    lavMenuThree,
    lavMenuItem,
    lavMenuDivider,
    lavSwitch,
    lavLoader,
    lavTabs,
    lavTab,
    lavTag,
    lavTextarea,
    lavTooltip,
    lavUpper,

    lavContainer,
    lavSidebar,
    lavContent,

    lavImagePreload,

    install(Vue) {
        Vue.component('lav-avatar', lavAvatar);
        Vue.component('lav-breadcrumbs', lavBreadcrumbs);
        Vue.component('lav-button', lavButton);
        Vue.component('lav-card', lavCard);
        Vue.component('lav-checkbox', lavCheckbox);
        Vue.component('lav-checkbox-group', lavCheckboxGroup);
        Vue.component('lav-divider', lavDivider);

        Vue.component('lav-dropdown', lavDropdown);
        Vue.component('lav-dropdown-menu', lavDropdownMenu);
        Vue.component('lav-dropdown-menu-item', lavDropdownMenuItem);

        Vue.component('lav-file-input', lavFileInput);
        Vue.component('lav-gallery', lavGallery);
        Vue.component('lav-grid', lavGrid);
        Vue.component('lav-infinity-scroll', lavInfinityScroll);
        Vue.component('lav-icon', lavIcon);

        Vue.component('lav-text-input', lavTextInput);
        Vue.component('lav-password-input', lavPasswordInput);

        Vue.component('lav-modal', lavModal);
        Vue.component('lav-pagination', lavPagination);
        Vue.component('lav-progress', lavProgress);
        Vue.component('lav-radio', lavRadio);
        Vue.component('lav-radio-group', lavRadioGroup);
        Vue.component('lav-select', lavSelect);
        Vue.component('lav-menu', lavMenu);
        Vue.component('lav-menu-three', lavMenuThree);
        Vue.component('lav-menu-item', lavMenuItem);
        Vue.component('lav-menu-divider', lavMenuDivider);
        Vue.component('lav-switch', lavSwitch);
        Vue.component('lav-loader', lavLoader);
        Vue.component('lav-tabs', lavTabs);
        Vue.component('lav-tab', lavTab);
        Vue.component('lav-tag', lavTag);
        Vue.component('lav-textarea', lavTextarea);
        Vue.component('lav-tooltip', lavTooltip);
        Vue.component('lav-upper', lavUpper);

        Vue.component('lav-container', lavContainer);
        Vue.component('lav-sidebar', lavSidebar);
        Vue.component('lav-content', lavContent);

        Vue.directive('lav-ripple', lavRipple);

        Vue.component('lav-preload-image', lavImagePreload);

        Vue.prototype.$lavGallery = galleryController;
        Vue.prototype.$lavNotify = notificationController;
        Vue.prototype.$lavProgress = progressController;
        Vue.prototype.$lavModal = modalController;
    }
};

export default LavUI;

export { lavAvatar };
export { lavBreadcrumbs };
export { lavButton };
export { lavCard };
export { lavCheckbox };
export { lavCheckboxGroup };
export { lavDivider };
export { lavDropdown };
export { lavDropdownMenu };
export { lavDropdownMenuItem };
export { lavFileInput };
export { lavGallery };
export { lavGrid };
export { lavInfinityScroll };
export { lavIcon };
export { lavTextInput };
export { lavPasswordInput };
export { lavModal };
export { notificationController };
export { lavPagination };
export { lavProgress };
export { lavRadio };
export { lavRadioGroup };
export { lavSelect };
export { lavMenu };
export { lavMenuThree };
export { lavMenuItem };
export { lavMenuDivider };
export { lavSwitch };
export { lavLoader };
export { lavTabs };
export { lavTab };
export { lavTag };
export { lavTextarea };
export { lavTooltip };
export { lavUpper };

export { lavContainer };
export { lavSidebar };
export { lavContent };


export { lavImagePreload };
