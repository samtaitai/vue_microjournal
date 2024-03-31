<script setup>
    const props = defineProps({
        tweets: Array
    });

    import { ref, defineExpose, onMounted } from 'vue';
    import axios from 'axios';
    //import { Post } from '../../../backend/src/models/Post' //ES6 syntax 
    //const Post = require('../models/Post.js'); before ES6 syntax  

    //datas
    let entryTextarea = ref(null);
    let request = {
        userId: '',
        userName: '',
        recordTime: null,
        userText: ''
    };
    let posts = ref([]); 
    let post = ref({});

    //to declare reactive state is using ref() function 
    //ref() takes argument(=initial value) and returns ref object with a value property 
    //posts initially is empty array, and posts.value is the array 
    onMounted(() => {
        fetchPosts();
    });

    //methods  
    const reset = () => {
        entryTextarea.value.value = '';
    };
    const fetchPosts = () => {
        axios.get('http://localhost:3000/posts')
        .then(response => { 
            posts.value = response.data; 
        })
    };
    const saveEntry = () => {
        request.userId = '@admin';
        request.userName = 'admin';
        request.recordTime = new Date();

        console.log('request before call', request);
        axios.post('http://localhost:3000/posts', request)
        .then(() => {
            request.userText = '';
            fetchPosts();
        });
    }
    const grabURL = (id) => {
        const domain = "http://localhost:3000/post/";
        const url = domain + id;
        console.log(url);
        return url;
    }
    const showTweet = () => {
        //open new screen for a single post 
        //this new page will be landing page 
    }
    const postItem = () => {
        //TODO: access twitter 
    }
    const copyEntry = (entry) => {
        //this userText should be masked 
        var url = grabURL(entry._id);
        var copiedString = entry.userText + " " + url;
        console.log(copiedString);
        return copiedString;
    }
    const maskString = (beforeString) => {
        //before: this is [spoiler]
        //after: this is ********
        //find [ and ], replace each character inside [] into * <- shold be iterative, until the end
        //return afterString

    }

    //expose them to its parent component 
    defineExpose({ reset, fetchPosts, saveEntry });
</script>

<template>
    <div class="row my-2">
        <div class="col d-grid gap-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#entryModal">Post</button>
        </div>
    </div>
    <ul class="list-group">
        <li class="list-group-item" v-for="post in posts">
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
                <div class="d-flex justify-content-start">
                    <div class="mr-2">
                        <font-awesome-icon icon="fa-comment" @click="postItem()"></font-awesome-icon><span class="fs-6 fw-light"> tweet</span>
                    </div>
                    <div class="mx-2"> 
                        <font-awesome-icon icon="fa-copy" @click="copyEntry(post)"></font-awesome-icon><span class="fs-6 fw-light"> copy</span>
                    </div>
                    <div class="ml-2">
                        <font-awesome-icon icon="fa-share-from-square" @click="grabURL(post._id)"></font-awesome-icon><span class="fs-6 fw-light"> show tweet</span>
                    </div>
                </div>
            </article>
        </li>
    </ul>

    <!-- entry modal -->
    <div class="modal" tabindex="-1" id="entryModal" v-if="showModal = true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reset"></button>
            </div>
            <div class="modal-body">
                <textarea v-model="request.userText" class="form-control" ref="entryTextarea" rows="3" placeholder="Wrap spoiler with '[' and ']'"></textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveEntry()">Post</button>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
