import Color from 'color';

export default {
  methods: {
    setColor(clr) {
      return Color(clr).alpha(0.3).rgb().string();
    },
    chooseColor(clr) {
      return Color(clr).isDark() ? '#fff' : '#000';
    }
  }
}