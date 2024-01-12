<template>
  <div>
    <h1>Hello World!</h1>
    <p>
      We are using Node.js <span id="node-version"></span>,
      Chromium <span id="chrome-version"></span>,
      and Electron <span id="electron-version"></span>.
    </p>
    <video id="video" autoplay></video>
    <p></p>
    <div>
      <button @click="getVideo()"> 启动 </button>
      <button @click="closeVideo()"> 关闭 </button>
      <button @click="getPicture()"> 拍照 </button>
      <p></p>
      <div>
        <li v-for="(item, index) in images" :key=index>
          <a class="deleteIcon" @click="deleteImg(item)">X</a>
          <img :src=item />
      </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function () {
    return {
      images: [],
      stream: null,
    };
  },
  methods: {
    async getVideo() {
      this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
      document.querySelector('#video').srcObject = this.stream;
    },
    async getPicture() {
      const video = document.getElementById('video');
      const canvas = document.createElement('canvas');
      canvas.height = video.height || 300;
      canvas.width = video.width || 400;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL('image/png');
      this.images.push(url)
    },
    deleteImg(img) {
      const i = this.images.indexOf(img)
      this.images.splice(i, 1);
    },
    async closeVideo() {
      this.stream.getTracks()[0].stop();
      this.stream.getTracks()[1].stop();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

li .deleteIcon {
  color: white;
  position: absolute;
  margin-left: 376px;
  margin-top: 10px;
}

li .deleteIcon:hover {
  color: red;
  cursor: pointer;
}
</style>
