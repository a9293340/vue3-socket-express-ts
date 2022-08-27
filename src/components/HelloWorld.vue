<script lang="ts">
import {defineComponent} from 'vue';
import AxiosApi from '@/assets/api/aixos'
import {inject, onMounted} from "vue";
import {AxiosGet} from '@/assets/type'
import _ from 'lodash';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const socket: any = inject("socket");
    const debounce = _.debounce(() => {
      console.log('lodash Success')
    },5000)

    const handleSendMessage = () => {
      console.log('HA')
      socket.emit("message", "{ text:  '客户端发送的消息'}");
    };


    const getMsg = () => {
      const axiosGet: AxiosGet[] = [{key: 'name', value: 'Eric'}];
      AxiosApi.get('/personal', axiosGet).then((res: object) => {
        console.log('res = ', res)
      })
    }
    const postMsg = () => {
      AxiosApi.post('/favorite', {name: 'money'}).then((res: object) => {
        console.log('post res = ', res)
      })
    }

    onMounted(() => {
      socket.on("connection", (res: string) => {
        console.log("#connection: ", res);
      });

      socket.on("connected", (res: object) => {
        console.log("#connected: ", res);
      });

      socket.on("message", (res: object) => {
        console.log("#message: ", res);
      });
      debounce();
    })

    return {
      getMsg,
      postMsg,
      handleSendMessage
    }

  }
});
</script>


<template>
  <div class="font-bold text-white bg-neutral-800">Hello World</div>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button type="button" name="button" v-on:click="getMsg">get</button>
    <button type="button" name="button" v-on:click="postMsg">post</button>
    <button type="button" name="button" v-on:click="handleSendMessage">socket</button>
  </div>
</template>


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
