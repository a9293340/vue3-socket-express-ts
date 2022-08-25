<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" name="button" v-on:click="getmsg">get</button>
    <button type="button" name="button" v-on:click="postmsg">post</button>
    <button type="button" name="button" v-on:click="handleSendMessage">socket</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from "axios";
import {inject, onMounted} from "vue";

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup(){
    const socket : any = inject("socket");
    console.log(socket)

    const handleSendMessage = () => {
      console.log('酷酷')
      socket.emit("message", "{ text:  '客户端发送的消息'}");
    };


    const getmsg = () => {
      axios.get('/api/personal?name=MUKI').then((res : object) => {
        console.log('res = ',res)
      } )
    }
    const postmsg = () => {
      axios.post('/api/favorite', {name: 'money'}).then((res : object) => {
        console.log('post res = ', res)
      })
    }

    onMounted(() => {
      socket.on("connection", (res : string) => {
        console.log("#connection: ", res);
      });

      socket.on("connected", (res : object) => {
        console.log("#connected: ", res);
      });

      socket.on("message", (res : object) => {
        console.log("#message: ", res);
      });
    })

    return{
      getmsg,
      postmsg,
      handleSendMessage
    }

  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
