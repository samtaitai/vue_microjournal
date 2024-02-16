<script setup>
    defineProps({
        tweets: {
            type: Array,
        }
    });

    import { ref, defineExpose, onMounted } from 'vue';
    import axios from 'axios';

    //
    const posts = ref([]);
    onMounted(async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/posts');
            posts.value = response.data;
        }
        catch (error) {
            console.error('Error fetching posts:', error);
        }
    });

    let entry = '';

    //when close modal, erase textarea 
    const entryTextarea = ref(null);
    const reset = () => {
        entryTextarea.value.value = '';
    };

    defineExpose({ reset });
</script>

<template>
    <div class="row my-2">
        <div class="col d-grid gap-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#entryModal">Post</button>
        </div>
    </div>
    <ul class="list-group">
        <li class="list-group-item" v-for="post in tweets">
            <article class="container-fluid">
                <div class="row">
                    <div class="col">
                        <span class="fs-6 fw-bold" style="margin-right: 10px;">{{ post.userName }}</span>
                        <span class="fs-6">{{ post.userId }} · {{ post.recordTime }}</span>
                    </div>
                </div>
                <div class="row fs-4">
                    <div class="col">{{ post.userText }}</div>
                </div>
            </article>
        </li>
    </ul>

    <!-- entry modal -->
    <div class="modal" tabindex="-1" id="entryModal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reset"></button>
            </div>
            <div class="modal-body">
                <textarea v-model="entry" class="form-control" ref="entryTextarea" rows="3"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" @click="console.log(entry)">Post</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
