<!-- eslint-disable vue/multi-word-component-names -->

<template>
    <div class="product-list">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h2 class="display-4">Product Management</h2>
            <p><router-link to="/product/create">Add new</router-link></p>
        </div>

        <div class="container">
            <div class="card-deck mb-3 text-center">
                <table class="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr :key="index" v-for="(product, index) in products">
                        <th scope="row">{{index}}</th>
                        <td>{{product.name}}</td>
                        <td>{{product.price}}</td>
                        <td>{{product.description}}</td>
                        <td>
                            <router-link :to="{name : 'product.edit', params: {id: product.id}}">
                                <button class="btn btn-primary">Edit</button> 
                            </router-link>
                            <button class="btn btn-danger" @click="OnDeleteProduct(product.id)">Delete</button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import Swal from 'sweetalert2';

    export default {
        name: 'ProductList',
        data() {
            return {
                products: []
            }   
        },
        created() {
            this.GetAllProducts();
        },
        methods: {
            GetAllProducts() {
                this.$request.get('http://localhost:8000/api/products')
                    .then(res => {
                         this.products = res.data;
                    })
            },

            OnDeleteProduct(productId) {
                Swal.fire({
                    title: "Are you sure ?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$request.delete(`http://localhost:8000/api/products/${productId}`)
                            .then(res => {
                                if(res.data.success) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your file has been deleted.",
                                        icon: "success"
                                    });
                                    this.GetAllProducts();
                                }
                            })
                    }
                });
            }
        }
    }
</script>