import React, { useState } from "react";
import { Paper, TextField, Typography, Grid, Button } from "@mui/material";

const NewProduct = () => {
    let paperStyle = {
        width: 400,
        margin: "20px auto",
        padding: "20px",
    };

    let [newproduct, setNewProduct] = useState({
        title: "",
        price: 500,
        description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
            rate: 0,
            count: 0,
        },
    });
    let handleChange = (e) => {
        let { value, name } = e.target;
        let fileName = name.split("rating.")[1];
        if (name.includes("rating.")) {
            setNewProduct({
                ...newproduct,
                rating: {
                    ...newproduct.rating,
                    [fileName]: value
                }
            });
        } else {
            setNewProduct({
                ...newproduct,
                [name]: value,
            });
        }
    };
    let handleAdd = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/products", {
            method: "POST",
            header: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(newproduct),
        }).then(() => {
            alert("Data Added Successfully");
            setNewProduct({
        title: "",
        price: 500,
        description:
            "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
            rate: 0,
            count: 0,
        },
    });
        });
    };

    return (
        <Paper elevation={20} style={paperStyle}>
            <Typography variant="h5" textalign="center" style={{margin:"10x 0"}}>
                {" "}
                Create New Products{""}
            </Typography>
            <Grid
                component="form"
                style={{ display: "grid", gap: "20px" }}
                onSubmit={handleAdd}
            >
                <TextField
                    value={newproduct.title}
                    name="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    value={newproduct.category}
                    name="category"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
                <Grid container spacing={3}>
                    <Grid size={5}>
                        <TextField
                            value={newproduct.rating.rate}
                            name="rating.rate"
                            type="number"
                            label="Rate"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={5}>
                        <TextField
                            value={newproduct.rating.count}
                            name="rating.count"
                            type="number"
                            label="Count"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained"  fullWidth>
                    Add
                </Button>
            </Grid>
        </Paper>
    );
};

export default NewProduct;
