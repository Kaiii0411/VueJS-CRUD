<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="product-info">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h2 class="display-4">Product Infomation</h2>
            <router-link to="/product">Back</router-link>
        </div>

        <div class="container">
            <form @submit.prevent ="SaveProduct()">
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product name</label>
                    <div class="col-sm-9">
                        <input type="text" 
                            class="form-control" 
                            v-model="product.name"
                            @blur="ValidateProduct"
                            v-bind:class="{'is-invalid': errors.name}"/>
                        <div class="invalid-feedback"
                            v-if="errors.name">
                            {{errors.name}}
                        </div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product price</label>
                    <div class="col-sm-9">
                        <input type="text" 
                            class="form-control" 
                            v-model="product.price"
                            @blur="ValidateProduct"
                            v-bind:class="{'is-invalid': errors.price}"/>
                        <div class="invalid-feedback"
                            v-if="errors.price">
                            {{errors.price}}
                        </div>                            
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product description</label>
                    <div class="col-sm-9">
                        <textarea class="form-control" rows="3" 
                            v-model="product.description"
                            @blur="ValidateProduct"
                            v-bind:class="{'is-invalid': errors.description}">
                        </textarea>
                        <div class="invalid-feedback"
                            v-if="errors.description">
                            {{errors.description}}
                        </div> 
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9">
                        <button type="submit" class="btn btn-primary">Save</button> &nbsp;
                        <button type="reset" class="btn btn-danger" @click="Cancel()">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default{
        name: "ProductForm",
        data() {
            return {
                errors: {
                    name: '',
                    price: '',
                    description: ''
                },
                product: {
                    name: '',
                    price: '',
                    description: ''
                }
            }
        },
        created() {
            let productId = this.$route.params.id;
            if(productId){
                this.GetProductDetails(productId);
            }

        },
        methods: {
            ValidateProduct() {
                let isValid = true;

                this.errors = {
                    name: '',
                    price: '',
                    description: ''
                }

                if(!this.product.name){
                    this.errors.name = 'Product name is required!'; 
                    isValid = false;
                }

                if(!this.product.price){
                    this.errors.price = 'Product price is required!';
                    isValid = false;
                } 
                
                else if(!this.IsNumber(this.product.price)){
                    this.errors.price = 'Product price must be number!'; 
                    isValid = false;
                }

                if(!this.product.description){
                    this.errors.description = 'Product description is required!'; 
                    isValid = false;
                }

                return isValid;
            },

            IsNumber(value){
                return /^\d*$/.test(value);
            },

            SaveProduct() {
                if(this.ValidateProduct())
                {
                    if(this.product.id){
                        this.$request.put(`http://localhost:8000/api/products/${this.product.id}`, this.product)
                        .then(res => {
                            if(res.data.success) {
                                this.$router.push({name: 'product.list'})
                                return;
                            }

                            alert("Something went wrong!");
                        }).catch(error => {
                            console.error("There was an error updating the product:", error);
                            alert("Something went wrong!");
                        });              
                    }
                    else{
                        this.$request.post('http://localhost:8000/api/products', this.product)
                        .then(res => {
                            if(res.data.success)
                            {
                                this.$router.push({name: 'product.list'})
                                return;
                            }

                            alert("Something went wrong!");
                        })
                    }
                }
            },

            GetProductDetails(productId) {
                this.$request.get(`http://localhost:8000/api/products/${productId}`)
                .then(res => {
                    this.product = res.data;
                });
            },

            Cancel(){
                this.product.name = '';
                this.product.price = '';    
                this.product.description = '';
            }
        },
    }
</script>