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

//inputs
import lavTextInput from './components/text-input';
import lavPasswordInput from './components/password-input';

import lavModal from './components/modal/modal.vue';
import lavPagination from './components/pagination/index.vue';
import lavProgress from './components/progress/index.vue';
import lavRadio from './components/radio/index.vue';
import lavRadioGroup from './components/radio-group/index.vue';
import lavSelect from './components/select/index.vue';
import lavSidebarMenu from './components/sidebar-menu';
import lavSidebarMenuThree from './components/sidebar-menu/three';
import lavSidebarMenuItem from './components/sidebar-menu/item';
import lavSidebarMenuDivider from './components/sidebar-menu/divider';
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
    lavSidebarMenu,
    lavSidebarMenuThree,
    lavSidebarMenuItem,
    lavSidebarMenuDivider,
    lavSwitch,
    lavTabs,
    lavTab,
    lavTag,
    lavTextarea,
    lavTooltip,
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
        Vue.component('lav-checkbox-group', lavCheckboxGroup);
        Vue.component('lav-divider', lavDivider);

        Vue.component('lav-dropdown', lavDropdown);
        Vue.component('lav-dropdown-menu', lavDropdownMenu);
        Vue.component('lav-dropdown-menu-item', lavDropdownMenuItem);

        Vue.component('lav-file-input', lavFileInput);
        Vue.component('lav-gallery', lavGallery);
        Vue.component('lav-grid', lavGrid);
        Vue.component('lav-infinity-scroll', lavInfinityScroll);

        Vue.component('lav-text-input', lavTextInput);
        Vue.component('lav-password-input', lavPasswordInput);

        Vue.component('lav-modal', lavModal);
        Vue.component('lav-pagination', lavPagination);
        Vue.component('lav-progress', lavProgress);
        Vue.component('lav-radio', lavRadio);
        Vue.component('lav-radio-group', lavRadioGroup);
        Vue.component('lav-select', lavSelect);
        Vue.component('lav-sidebar-menu', lavSidebarMenu);
        Vue.component('lav-sidebar-menu-three', lavSidebarMenuThree);
        Vue.component('lav-sidebar-menu-item', lavSidebarMenuItem);
        Vue.component('lav-sidebar-menu-divider', lavSidebarMenuDivider);
        Vue.component('lav-switch', lavSwitch);
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
export { lavTextInput };
export { lavPasswordInput };
export { lavModal };
export { notificationController };
export { lavPagination };
export { lavProgress };
export { lavRadio };
export { lavRadioGroup };
export { lavSelect };
export { lavSidebarMenu };
export { lavSidebarMenuThree };
export { lavSidebarMenuItem };
export { lavSidebarMenuDivider };
export { lavSwitch };
export { lavTabs };
export { lavTab };
export { lavTag };
export { lavTextarea };
export { lavTooltip };
export { lavUpper };

export { lavContainer };
export { lavSidebar };
export { lavContent };
