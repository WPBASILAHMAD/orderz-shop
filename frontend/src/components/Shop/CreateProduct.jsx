/** @format */

import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [shippingCost, setShippingCost] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributeOptions, setSelectedAttributeOptions] = useState({});
  const [variations, setVariations] = useState([]);
  const [isVariableProduct, setIsVariableProduct] = useState(false); // State for variable product

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(`${server}/attribute`, {
          params: { shopId: seller._id },
        });
        setAttributes(response.data.attributes);
      } catch (error) {
        toast.error("Failed to fetch attributes");
      }
    };

    fetchAttributes();
  }, [seller._id]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard-products");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const generateCombinations = (options) => {
    if (!options.length) return [[]];
    const [first, ...rest] = options;
    const combosWithoutFirst = generateCombinations(rest);
    return first.flatMap((option) =>
      combosWithoutFirst.map((combo) => [option, ...combo])
    );
  };

  const updateVariations = () => {
    const selectedOptions = Object.values(selectedAttributeOptions).filter(
      (option) => option.length > 0
    );
    const combinations = generateCombinations(selectedOptions);

    const newVariations = combinations.map((combo) => ({
      options: combo,
      sku: "",
      price: "",
      stock: "",
    }));

    setVariations(newVariations);
  };

  const handleAttributeChange = (attributeId, option) => {
    setSelectedAttributeOptions((prev) => {
      const options = prev[attributeId] || [];
      return {
        ...prev,
        [attributeId]: options.includes(option)
          ? options.filter((o) => o !== option)
          : [...options, option],
      };
    });
  };

  useEffect(() => {
    updateVariations();
  }, [selectedAttributeOptions]);

  const handleVariationChange = (index, key, value) => {
    const newVariations = [...variations];
    newVariations[index][key] = value;
    setVariations(newVariations);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one product image.");
      return; 
    }
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });

    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("subcategory", subcategory);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    if (discountPrice) {
      newForm.append("discountPrice", discountPrice);
    }
    newForm.append("stock", stock);
    newForm.append("shippingCost", shippingCost);
    newForm.append("isFreeShipping", isFreeShipping);
    newForm.append("shopId", seller._id);

    variations.forEach((variation) => {
      newForm.append("variations", JSON.stringify(variation));
    });

    dispatch(
      createProduct({
        name,
        description,
        category,
        subcategory, // Include subcategory
        tags,
        originalPrice,
        discountPrice: discountPrice || null, // Ensure it’s not undefined
        stock,
        shippingCost,
        isFreeShipping,
        shopId: seller._id,
        images,
        variations,
      })
    );
  };

  const getSubcategories = () => {
    const selectedCategory = categoriesData.find(
      (cat) => cat.title === category
    );
    return selectedCategory ? selectedCategory.subcategories : [];
  };
  return (
    <div className="w-[90%] 800px:w-[100%] bg-white shadow rounded-[4px] p-8 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isVariableProduct}
                  onChange={(e) => {
                    setIsVariableProduct(e.target.checked);
                    setSelectedAttributeOptions({}); // Reset selected options when toggling
                    setVariations([]); // Clear variations when switching product type
                  }}
                />
              }
              label="Is this a variable product?"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name "
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description "
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Category *</InputLabel>
              <Select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubcategory("");
                }}
                required>
                <MenuItem value="">
                  <em>Choose a category</em>
                </MenuItem>
                {categoriesData.map((i) => (
                  <MenuItem value={i.title} key={i.id}>
                    {i.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                disabled={!category}>
                <MenuItem value="">
                  <em>Choose a subcategory</em>
                </MenuItem>
                {getSubcategories().map((sub) => (
                  <MenuItem value={sub.title} key={sub.id}>
                    {sub.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Tags"
              variant="outlined"
              fullWidth
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Original Price "
              type="number"
              variant="outlined"
              fullWidth
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Price (With Discount)"
              type="number"
              variant="outlined"
              fullWidth
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Product Stock "
              type="number"
              variant="outlined"
              fullWidth
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Shipping Cost"
              type="number"
              variant="outlined"
              fullWidth
              value={shippingCost}
              onChange={(e) => setShippingCost(e.target.value)}
              disabled={isFreeShipping}
              size="small"
            />
          </Grid>

          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFreeShipping}
                  onChange={(e) => setIsFreeShipping(e.target.checked)}
                />
              }
              label="Free Shipping"
            />
          </Grid>

          <Grid item xs={12}>
            <input
              type="file"
              id="upload"
              className="hidden"
              multiple
              onChange={handleImageChange}
            />
            <label htmlFor="upload">
              Upload Product Images
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
            </label>
            <div className="w-full flex items-center flex-wrap">
              {images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  required
                  className="h-[60px] w-[60px] object-cover m-2"
                />
              ))}
            </div>
          </Grid>

          {isVariableProduct &&
            attributes.map((attribute) => (
              <Grid item xs={12} key={attribute._id}>
                <h5 className="text-[20px] font-Poppins">
                  {attribute.name} Options
                </h5>
                {attribute.options.map((option) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={
                          selectedAttributeOptions[attribute._id]?.includes(
                            option.value
                          ) || false
                        }
                        onChange={() =>
                          handleAttributeChange(attribute._id, option.value)
                        }
                      />
                    }
                    label={option.value}
                    key={option.key}
                  />
                ))}
              </Grid>
            ))}

          {isVariableProduct && variations.length > 0 && (
            <Grid item xs={12}>
              <h5 className="text-[20px] font-Poppins">Product Variations</h5>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Options</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {variations.map((variation, index) => (
                      <TableRow key={index}>
                        <TableCell>{variation.options.join(" / ")}</TableCell>
                        <TableCell>
                          <TextField
                            value={variation.sku}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "sku",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={variation.price}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "price",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            type="number"
                            value={variation.stock}
                            onChange={(e) =>
                              handleVariationChange(
                                index,
                                "stock",
                                e.target.value
                              )
                            }
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-2">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default CreateProduct;
