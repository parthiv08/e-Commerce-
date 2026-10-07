import React, { useEffect, useState } from 'react'
import { Paper, TextField, Typography, Grid, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
 let paperStyle = {
        width: 400,
        margin: "20px auto",
        padding: "20px",
    };

    let [updateproduct, setUpdateProduct] = useState(null);

    let {id}=useParams()
     let navigate=useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:5000/products/${id}`)
        .then((res)=>{setUpdateProduct(res.data);
        })


    },[])




    let handleChange = (e) => {
        let { value, name } = e.target;
        let fileName = name.split("rating.")[1];
        if (name.includes("rating.")) {
            setUpdateProduct({
                ...updateproduct,
                rating: {
                    ...updateproduct.rating,
                    [fileName]: value
                }
            });
        } else {
            setUpdateProduct({
                ...updateproduct,
                [name]: value,
            });
        }
    };
    let handleUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/products/${id}`, {
            method: "PUT",
            header: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(updateproduct),
        }).then(() => {
            alert("Data Saved Successfully");
            navigate("/product")
            
        });
    };
    if(updateproduct!==null){
        return (
        <Paper elevation={20} style={paperStyle}>
            <Typography variant="h5" textalign="center" style={{margin:"10x 0"}}>
                {" "}
                Update New Products{""}
            </Typography>
            <Grid
                component="form"
                style={{ display: "grid", gap: "20px" }}
                onSubmit={handleUpdate}
            >
                <TextField
                    value={updateproduct.title}
                    name="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
                <TextField
                    value={updateproduct.category}
                    name="category"
                    label="Category"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                />
                <Grid container spacing={3}>
                    <Grid size={5}>
                        <TextField
                            value={updateproduct.rating.rate}
                            name="rating.rate"
                            type="number"
                            label="Rate"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid size={5}>
                        <TextField
                            value={updateproduct.rating.count}
                            name="rating.count"
                            type="number"
                            label="Count"
                            variant="outlined"
                            onChange={handleChange}
                        />
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="success" fullWidth>
                    Save
                </Button>
            </Grid>
        </Paper>
    );

    }
    else{
        <div>Loading...</div>
    }

    
}

export default UpdateProduct