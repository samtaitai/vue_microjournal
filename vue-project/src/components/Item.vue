<script setup>
    const props = defineProps({
        id: String
    });

    import { ref, defineExpose, onMounted } from 'vue';
    import axios from 'axios';

    //datas
    let post = ref({});
    let localId = props.id;

    onMounted(() => {
        fetchItem(localId);
    });

    //methods  
    const fetchItem = (id) => {
        axios.get(`http://localhost:3000/post/:${id}`)
        .then(response => { 
            post.value = response.data; 
        })
    };
    //expose them to its parent component 
    defineExpose({ fetchItem });
</script>

<template>
    <article class="container-fluid">
        <div class="row">
            <div class="col">
                <span class="fs-6 fw-bold" style="margin-right: 10px;">{{ post.userName }}</span>
                <span class="fs-6">{{ post.userId }} · {{ post.recordTime }}</span>
            </div>
        </div>
        <div class="row fs-6">
            <div class="col">{{ post.userText }}</div>
        </div>
    </article>
</template>

<style scoped>
</style>
