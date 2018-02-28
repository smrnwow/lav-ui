import zalupaGallery from '@components/gallery/index.vue';


new Vue ({
    data: {
        images: [
            'img/1.png',
            'img/2.png',
            'img/3.png'
        ]
    },
    el: '#container',
    components: {
        zalupaGallery
    }
});
