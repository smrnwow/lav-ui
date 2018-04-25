import Color from 'color';

export default {
  methods: {
    setColorTransparent(color, alpha) {
      return Color(color).alpha(alpha).rgb().string();
    },
    setColorByContrast(color) {
      return Color(color).isDark() ? '#fff' : 'rgba(0,0,0,.7)';
    },
    setGray(color) {
      return Color(color).grayscale();
    }
  }
}
