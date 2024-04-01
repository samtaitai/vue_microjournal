<script setup>
    const props = defineProps({
        tweets: Array
    });

    import { ref, defineExpose, onMounted, watch } from 'vue';
    import axios from 'axios';
    //import { Post } from '../../../backend/src/models/Post' //ES6 syntax 
    //const Post = require('../models/Post.js'); before ES6 syntax  

    //datas
    let entryTextarea = ref(null);
    let entryPassword = ref(null);
    let request = {
        userId: '',
        userName: '',
        recordTime: null,
        userText: '',
        maskedUserText: ''
    };
    let posts = ref([]); 
    let post = ref({});
    let passwordInput = ref(null);
    let givenPassword = '';
    let retrievedPassword = '';
    let isPasswordCorrect = false;
    let isPasswordEntered = false;

    //to declare reactive state is using ref() function 
    //ref() takes argument(=initial value) and returns ref object with a value property 
    //posts initially is empty array, and posts.value is the array 
    onMounted(() => {
        fetchPosts();
    });

    //methods  
    const reset = () => {
        entryTextarea.value.value = '';
        entryPassword.value.value = '';
    };
    const resetPassword = () => {
        passwordInput.value.value = ''; //passwordInput.value = input element
        retrievedPassword = '';
        givenPassword = '';
        isPasswordCorrect = false;
        isPasswordEntered = false;
    }
    const fetchPosts = () => {
        axios.get('http://localhost:3000/posts')
        .then(response => { 
            posts.value = response.data; 
            posts.value = posts.value.reverse();
        })
    };
    const saveEntry = () => {
        request.userId = '@admin';
        request.userName = 'admin';
        request.recordTime = new Date();
        request.userText = request.userText.trim();
        request.maskedUserText = maskString(request.userText.trim());

        console.log('request before call', request);
        axios.post('http://localhost:3000/posts', request)
        .then(() => {
            fetchPosts();
        });
    }
    const grabURL = (id) => {
        const domain = "http://localhost:3000/post/";
        const url = domain + id;
        console.log(url);
        return url;
    }
    const showTweet = (id) => {
        isPasswordCorrect = false;
        axios.get(`http://localhost:3000/post/${id}`)
        .then(response => { 
            post.value = response.data;
            console.log(post.value);
            retrievedPassword = post.value.password;
        });
    }
    const postItem = () => {
        //TODO: access twitter 
    }
    const copyEntry = (entry) => {
        //this userText should be masked 
        var url = grabURL(entry._id);
        var copiedString = entry.maskedUserText + " " + url;
        console.log(copiedString);
        return copiedString;
    }
    const maskString = (beforeString) => {
        return beforeString.replace(/\[(.*?)\]/g, (_, match) => '*'.repeat(match.length));
    }
    const comparePassword = () => {
        console.log('given', givenPassword);
        console.log('retrieved', retrievedPassword);
        isPasswordEntered = true;
        console.log('isPasswordEntered', isPasswordEntered);
        isPasswordCorrect = givenPassword == retrievedPassword ? true : false; 
        if (isPasswordCorrect) {
                //$('#passwordModal').modal('hide');
                console.log('isPasswordCorrect', isPasswordCorrect);
        }
        else {
            console.log('isPasswordCorrect', isPasswordCorrect);
        } 
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
                    <div v-if="!isPasswordCorrect" class="col">{{ post.maskedUserText }}</div>
                    <div v-else class="col">{{ post.userText }}</div>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="mr-2">
                        <font-awesome-icon icon="fa-comment" @click="postItem()"></font-awesome-icon><span class="fs-6 fw-light"> tweet</span>
                    </div>
                    <div class="mx-2"> 
                        <font-awesome-icon icon="fa-copy" @click="copyEntry(post)"></font-awesome-icon><span class="fs-6 fw-light"> copy</span>
                    </div>
                    <div class="ml-2">
                        <font-awesome-icon icon="fa-share-from-square" data-bs-toggle="modal" data-bs-target="#passwordModal" @click="showTweet(post._id)"></font-awesome-icon><span class="fs-6 fw-light"> show tweet</span>
                    </div>
                </div>
            </article>
        </li>
    </ul>

    <!-- entry modal -->
    <div class="modal" tabindex="-1" id="entryModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="reset()"></button>
                </div>
                <div class="modal-body">
                    <textarea v-model="request.userText" class="form-control" ref="entryTextarea" rows="3" placeholder="Wrap spoiler with '[' and ']'"></textarea>
                    <div class="form-floating mt-2">
                        <input id="password" type="password" v-model="request.password" class="form-control" ref="entryPassword"></input>
                        <label for="password">Set the password for this tweet</label>     
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveEntry()">Post</button>
                </div>
            </div>
        </div>
    </div>

    <!-- password modal -->
    <div class="modal" tabindex="-1" id="passwordModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="resetPassword()"></button>
                </div>
                <div class="modal-body">
                    <div class="form-floating mt-2">
                        <input type="text" v-model="givenPassword" class="form-control" ref="passwordInput"></input>
                        <label for="password">Enter password</label>
                    </div>
                    <small class="text-danger" v-if="isPasswordEntered && !isPasswordCorrect">Incorrect password!</small>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="comparePassword()">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
