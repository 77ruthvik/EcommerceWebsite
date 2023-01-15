const controller = {};
let user_info = [];
let count_cart = 0;
let total_prices = 0;
let user_choice = "All";

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('select * from items', (err, item) => {
            if(err){
                console.log(err);
            }
            console.log(item);

            conn.query('select * from food_items', (errs, food) => {

                if(user_info.length != 0){
                    conn.query('select count(cart_id) as count from cart where user_id = ?', [user_info[0]['user_id']], (err, items) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(items);
                            res.render('customers', {
                                data: item,
                                foods: food,
                                cart_count: items,
                                user: user_info,
                                user_choice: user_choice
                            });
                        }
                    });
                }
                else{
                    res.render('customers', {
                        data: item,
                        foods: food,
                        cart_count: [{count: 0}],
                        user: user_info,
                        user_choice: user_choice
                    });
                }
                
            });

            
            /*res.render('customers', {
                data: item
            });*/
            //res.json(item);
        });
    })
}

controller.save = (req, res) => {
    const item_data = JSON.parse(JSON.stringify(req.body));
    console.log(item_data['quantity']);

    if(typeof item_data['quantity'] !== 'undefined'){
        const quantity = + item_data['quantity'];

        if(typeof item_data['item'] != 'undefined' && user_info.length != 0){
            const value = + item_data['item'];
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
            const user_name = user_info[0]['user_id'];
    
            req.getConnection((err, conn) => {
                conn.query('select item_name, src, price, quantity from items where id = ?', [value], (err, succ) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(succ);
                    conn.query('insert into cart (cart_id, date, time, user_id, item_name, img, price, quantity) values (?, ?, ?, ?, ?, ?, ?, ?)', [value, date, time, user_name, succ[0]['item_name'], succ[0]['src'], succ[0]['price']*quantity, quantity], (err, items) => {
                        if(err){
                            console.log(err);
                        }
                        conn.query('update items set quantity = ? where id = ?', [succ[0]['quantity']-quantity, value], (err, success) => {
                            console.log(items);
                            res.redirect('back');
                        });
                    });
                });
                
            });
            //console.log(value);
        }
        else if (typeof item_data['food'] != 'undefined' && user_info.length != 0){
            const value = + item_data['food'];
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
            const user_name = user_info[0]['user_id'];
    
            req.getConnection((err, conn) => {
                conn.query('select food_name, src, price, quantity from food_items where id = ?', [value], (err, succ) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(succ);
                    conn.query('insert into cart (cart_id, date, time, user_id, item_name, img, price, quantity) values (?, ?, ?, ?, ?, ?, ?, ?)', [value, date, time, user_name, succ[0]['food_name'], succ[0]['src'], succ[0]['price']*quantity, quantity], (err, items) => {
                        if(err){
                            console.log(err);
                        }
                        conn.query('update food_items set quantity = ? where id = ?', [succ[0].quantity-quantity, value], (err, success) => {
                            console.log(items);
                            res.redirect('back');
                        });
                    });
                });
                
            });
        }
        else{
            res.send('Cannot add items into cart without signing in to your account!!');
        }
    }
    else{
        if(typeof item_data['item'] != 'undefined' && user_info.length != 0){
            const value = + item_data['item'];
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
            const user_name = user_info[0]['user_id'];
    
            req.getConnection((err, conn) => {
                conn.query('select item_name, src, price, quantity from items where id = ?', [value], (err, succ) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(succ);
                    conn.query('insert into cart (cart_id, date, time, user_id, item_name, img, price, quantity) values (?, ?, ?, ?, ?, ?, ?, ?)', [value, date, time, user_name, succ[0]['item_name'], succ[0]['src'], succ[0]['price'], 1], (err, items) => {
                        if(err){
                            console.log(err);
                        }
                        conn.query('update items set quantity = ? where id = ?', [succ[0]['quantity']-1, value], (err, success) => {
                            console.log(items);
                            res.redirect('back');
                        });
                    });
                });
                
            });
            //console.log(value);
        }
        else if (typeof item_data['food'] != 'undefined' && user_info.length != 0){
            const value = + item_data['food'];
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
            const user_name = user_info[0]['user_id'];
    
            req.getConnection((err, conn) => {
                conn.query('select food_name, src, price, quantity from food_items where id = ?', [value], (err, succ) => {
                    if(err){
                        console.log(err);
                    }
                    console.log(succ);
                    conn.query('insert into cart (cart_id, date, time, user_id, item_name, img, price, quantity) values (?, ?, ?, ?, ?, ?, ?, ?)', [value, date, time, user_name, succ[0]['food_name'], succ[0]['src'], succ[0]['price'], 1], (err, items) => {
                        if(err){
                            console.log(err);
                        }
                        conn.query('update food_items set quantity = ? where id = ?', [succ[0].quantity-1, value], (err, success) => {
                            console.log(items);
                            res.redirect('back');
                        });
                    });
                });
                
            });
        }
        else{
            res.send('Cannot add items into cart without signing in to your account!!');
        }
    }
    
};

controller.del = (req, res) => {

    if(user_info.length != 0){
        const value = + JSON.parse(JSON.stringify(req.body))['item'];

        req.getConnection((err, conn) => {
            conn.query('select quantity from cart where cart_id = ?', [value], (err, succ) => {
                console.log(succ[0].quantity);
                conn.query('delete from cart where cart_id = ? and user_id = ?', [value, user_info[0]['user_id']], (err, item) => {
                    if(err){
                        console.log(err);
                    }
                    if(value<1000){
                        conn.query('select quantity from items where id = ?', [value], (err, success) => {
                            conn.query('update items set quantity = ? where id = ?', [success[0].quantity+succ[0].quantity, value], (err, item_up) => {
                                res.redirect('/cart');
                            })
                        });
                    }
                    else{
                        conn.query('select quantity from food_items where id = ?', [value], (err, success) => {
                            if(err){
                                console.log(err);
                            }
                            conn.query('update food_items set quantity = ? where id = ?', [success[0].quantity+succ[0].quantity, value], (err, item_up) => {
                                res.redirect('/cart');
                            })
                        });
                    }
                    
                });
            });
        })
        console.log(value);
    }
    else{
        res.send('Cannot delete items from cart without logging into your account!!');
    }
    
};

controller.login = (req, res) => {
    res.render('login', {
        message: ''
    });
};

controller.login_user = (req, res) => {
    const user_data = JSON.parse(JSON.stringify(req.body));
    const uname = user_data['username'];
    const password = user_data['password'];

    req.getConnection((err, conn) => {
        conn.query('select * from users where username = ?', [uname], (err, users) => {
            if(err){
                console.log(err);
            }
            //console.log(users);
            //console.log(users[0]['username']);
            if(users.length>0 && users[0]['username'] == uname && users[0]['password']==password){
                user_info = users;
                res.redirect('/');
            }
            else{
                res.render('login', {
                    message: 'Incorrect Username or Password!! Please Try Again!!'
                })
            }
            
        })
    })
    console.log(user_data);
};

controller.signup = (req, res) => {
    res.render('signup', {
        signup_message: ''
    });
};

controller.addUsers = (req, res) => {
    const users = JSON.parse(JSON.stringify(req.body));
    const name = users['name'];
    const email = users['email'];
    const username = users['username'];
    const password = users['password'];
    const date = new Date().toISOString().slice(0, 10);

    if(name == '' || email == '' || username == '' || password == ''){
        res.render('signup', {
            signup_message: 'Please Complete all the fields to Signup!!'
        });
    }
    else{
        console.log(users);

        req.getConnection((err, conn) => {
            conn.query('select * from users where username = ?', [username], (err, item) => {
                console.log(item);
    
                if(item.length != 0){
                    res.render('signup', {
                        signup_message: 'The Username is taken, please try using a different Username!'
                    });
                }
                else{
                    conn.query('insert into users (username, password, name, date_joined, email_address) values (?, ?, ?, ?, ?)', [username, password, name, date, email], (err, items) => {
                        if(err){
                            console.log(err);
                        }
                        user_info = [{
                            'name': name
                        }];
                        console.log(items);
                        res.redirect('/');
                    });
                }
            });
            
        });
    }
    
};

controller.signout = (req, res) => {
    user_info = [];
    count_cart = 0;
    total_prices = 0;
    user_choice = "All";
    res.redirect('/');
};

controller.viewcart = (req, res) => {
    if(user_info.length != 0){
        req.getConnection((err, conn) => {
            conn.query('select * from cart where user_id = ?', [user_info[0]['user_id']], (err, items) => {
                if(err){
                    console.log(err);
                }
                conn.query('select count(cart_id) as count from cart where user_id = ?', [user_info[0].user_id], (err, succ) => {
                    res.render('cart', {
                        user: user_info,
                        cart_items: items,
                        cart_count: succ
                    });
                });
                
            });
        })
    }
    else{
        res.send('Cannot Access login without signing into your account. Please Signin!!');
    }
};

controller.search = (req, res) => {
    const user_input = JSON.parse(JSON.stringify(req.body))['user-input'];
    console.log(user_input);

    if(user_input != ''){
        req.getConnection((err, conn) => {
            conn.query('select * from items where item_name = ?', [user_input], (err, succ) => {
                if(err){
                    console.log(err);
                }
                conn.query('select * from food_items where food_name = ?', [user_input], (err, foods) => {
                    if(err){
                        console.log(err);
                    }
    
                    if(user_info.length != 0){
                        conn.query('select count(cart_id) as count from cart where user_id = ?', [user_info[0]['user_id']], (err, items) => {
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log(items);
                                res.render('customers', {
                                    data: succ,
                                    foods: foods,
                                    cart_count: items,
                                    user: user_info,
                                    user_choice: user_choice
                                });
                            }
                        });
                    }
                    else{
                        res.render('customers', {
                            data: succ,
                            foods: foods,
                            cart_count: [{count: 0}],
                            user: user_info,
                            user_choice: user_choice
                        });
                    }
                });
            });
        });
    }
    else{
        res.redirect('/');
    }
    
};

controller.items_expanded = (req, res) => {
    const item_id = + req.params.id.substring(1);
    console.log(item_id);

    if(item_id<1000){
        req.getConnection((err, conn) => {
            conn.query('select * from items where id = ?', [item_id], (err, items) => {
                console.log(items);
                if(user_info.length != 0){
                    conn.query('select count(cart_id) as count from cart where user_id = ?', [user_info[0]['user_id']], (err, succ) => {
                        if(err){
                                console.log(err);
                        }
                        console.log(succ);
                        res.render('item-data',{
                            cart_count: succ,
                            user: user_info,
                            items: items,
                            food: ''
                        });
                    });
                    
                }
                else{
                    res.render('item-data',{
                        cart_count: [{count: 0}],
                        user: user_info,
                        items: items,
                        food: ''
                    });
                }
            });
        });
    }
    else{
        req.getConnection((err, conn) => {
            conn.query('select * from food_items where id = ?', [item_id], (err, items) => {
                console.log(items);
                if(user_info.length != 0){
                    conn.query('select count(cart_id) as count from cart where user_id = ?', [user_info[0]['user_id']], (err, succ) => {
                        if(err){
                                console.log(err);
                        }
                        console.log(succ);
                        res.render('item-data',{
                            cart_count: succ,
                            user: user_info,
                            items: '',
                            food: items
                        });
                    });
                    
                }
                else{
                    res.render('item-data',{
                        cart_count: [{count: 0}],
                        user: user_info,
                        items: '',
                        food: items
                    });
                }
            });
        });
    }
    
};

controller.checkout = (req, res) => {
    req.getConnection((err, conn) => {
        if(user_info.length != 0){
            conn.query('select count(cart_id) as count from cart where user_id = ?', [user_info[0].user_id], (err, succ) => {
                if(err){
                    console.log(err);
                }
                else{
                    conn.query('select * from cart where user_id = ?', [user_info[0].user_id], (err, items) => {
                        //console.log(items.length);
                        conn.query('select sum(price) as price from cart where user_id = ?', [user_info[0].user_id], (err, success) => {
                            //console.log(success);
                            count_cart = + items.length;
                            total_prices = + success[0].price;

                            res.render('checkout', {
                                user: user_info,
                                cart_count: succ,
                                item_count: items.length,
                                total_price: success
                            });
                        });
                        
                    });
                }
            });
        }
    });
    
};

controller.buy = (req, res) => {
    if(Number.isInteger(+ JSON.parse(JSON.stringify(req.body))['house_num']) == true){
        const house_num = + JSON.parse(JSON.stringify(req.body))['house_num'];
        const street_name = JSON.parse(JSON.stringify(req.body))['street_name'];
        const city = JSON.parse(JSON.stringify(req.body))['city'];
        const prov = JSON.parse(JSON.stringify(req.body))['province'];
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();

        if(house_num == '' || street_name == '' || city == '' || prov == ''){
            alert('Please fill all the fields');
        }
        else{
            req.getConnection((err, conn) => {
                conn.query('insert into purchases (u_id, total_price, items_count, house_num, street_name, city, province, date, pur_time) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user_info[0]['user_id'], total_prices+(total_prices*0.13), count_cart, house_num, street_name, city, prov, date, time], (err, success) => {
                    if(err){
                        console.log(err);
                    }
                    conn.query('select p_id from purchases where u_id = ? and date = ? and pur_time = ?', [user_info[0].user_id, date, time], (err, pid) => {
                        if(err){
                            console.log(err);
                        }
                        console.log(pid);
                        conn.query('select * from cart where user_id = ?', [user_info[0]['user_id']], (err, items) => {
                            if(err){
                                console.log(err);
                            }
                            console.log(items);
            
                            for(let i=0; i<items.length; i++){
                                conn.query('insert into transactions (c_id, item_id, price, p_id, date) values (?, ?, ?, ?, ?)', [user_info[0]['user_id'], items[i]['cart_id'], (items[i]['price']+items[i]['price']*0.13), pid[0]['p_id'], date], (err, succ) => {
                                    if(err){
                                        console.log(err);
                                    }
                                });
                            }

                            conn.query('delete from cart where user_id = ?', [user_info[0]['user_id']], (err, carts) => {
                                if(err){
                                    console.log(err);
                                }
                                //res.redirect('/');
                                res.render('transaction', {
                                    user: user_info,
                                    cart_count: [{count: 0}]
                                });
                            });
                            //console.log('here');
                        });
                    })
                });
            })
        }
    }
    

}

controller.filter = (req, res) => {
    console.log(req.body.user_options);
    user_choice = req.body.user_options;
    res.redirect('/');
};

module.exports = controller;