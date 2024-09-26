/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
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
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import { Upload, DollarSign, Package, Truck, Tag, List } from "lucide-react";

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
  const [isVariableProduct, setIsVariableProduct] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://seller.orderzshop.com/wp-json/wc/v3/products/categories",
          {
            params: {
              per_page: 20,
              consumer_key: "ck_281d66cb1af4225a90c3c735f1c284b62ce7d7e8",
              consumer_secret: "cs_abf8f6b1783e631c17aa661ad09484fdf4717037",
            },
          }
        );
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

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
  }, [dispatch, error, success, navigate]);

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
        subcategory,
        tags,
        originalPrice,
        discountPrice: discountPrice || null,
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
    return categories.filter((cat) => cat.parent === parseInt(category));
  };

  return (
    <div className="max-h-[calc(100vh-100px)] overflow-y-auto">
      <Card className="w-full mx-auto shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-8">
          <Typography
            variant="h4"
            className="text-center mb-6 font-bold text-primary">
            Create New Product
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isVariableProduct}
                      onChange={(e) => {
                        setIsVariableProduct(e.target.checked);
                        setSelectedAttributeOptions({});
                        setVariations([]);
                      }}
                    />
                  }
                  label={
                    <Typography variant="body1" className="font-semibold">
                      Is this a variable product?
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Product Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <Tag className="mr-2 text-gray-400" size={20} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Category *</InputLabel>
                  <Select
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubcategory("");
                    }}
                    required
                    startAdornment={
                      <List className="mr-2 text-gray-400" size={20} />
                    }>
                    <MenuItem value="">
                      <em>Choose a category</em>
                    </MenuItem>
                    {categories
                      .filter(
                        (cat) => !cat.parent && cat.name !== "Uncategorized"
                      )
                      .map((cat) => (
                        <MenuItem value={cat.id} key={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Subcategory</InputLabel>
                  <Select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    disabled={!category}>
                    <MenuItem value="">
                      <em>Choose a subcategory</em>
                    </MenuItem>
                    {getSubcategories().length > 0 &&
                      getSubcategories().map((subcat) => (
                        <MenuItem value={subcat.id} key={subcat.id}>
                          {subcat.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  label="Tags"
                  variant="outlined"
                  fullWidth
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Tag className="mr-2 text-gray-400" size={20} />
                    ),
                  }}
                />
              </Grid>

              {!isVariableProduct && (
                <>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Original Price"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      required
                      InputProps={{
                        startAdornment: (
                          <DollarSign
                            className="mr-2 text-gray-400"
                            size={20}
                          />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Discounted Price"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={discountPrice}
                      onChange={(e) => setDiscountPrice(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <DollarSign
                            className="mr-2 text-gray-400"
                            size={20}
                          />
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <TextField
                      label="Product Stock"
                      type="number"
                      variant="outlined"
                      fullWidth
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      required
                      InputProps={{
                        startAdornment: (
                          <Package className="mr-2 text-gray-400" size={20} />
                        ),
                      }}
                    />
                  </Grid>
                </>
              )}

              <Grid item xs={12} md={2}>
                <TextField
                  label="Shipping Cost"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  disabled={isFreeShipping}
                  InputProps={{
                    startAdornment: (
                      <Truck className="mr-2 text-gray-400" size={20} />
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFreeShipping}
                      onChange={(e) => setIsFreeShipping(e.target.checked)}
                    />
                  }
                  label={
                    <Typography variant="body1" className="font-semibold">
                      Free Shipping
                    </Typography>
                  }
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  label="Product Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Grid>

              {isVariableProduct && (
                <Grid item xs={12}>
                  <Divider className="my-4" />
                  <Typography variant="h6" className="mb-4 font-semibold">
                    Product Attributes
                  </Typography>
                  {attributes.map((attribute) => (
                    <Box key={attribute._id} className="mb-4">
                      <Typography
                        variant="subtitle1"
                        className="font-semibold mb-2">
                        {attribute.name} Options
                      </Typography>
                      <Box className="flex flex-wrap gap-2">
                        {attribute.options.map((option) => (
                          <Chip
                            key={option.key}
                            label={option.value}
                            onClick={() =>
                              handleAttributeChange(attribute._id, option.value)
                            }
                            color={
                              selectedAttributeOptions[attribute._id]?.includes(
                                option.value
                              )
                                ? "primary"
                                : "default"
                            }
                            variant={
                              selectedAttributeOptions[attribute._id]?.includes(
                                option.value
                              )
                                ? "fille d"
                                : "outlined"
                            }
                          />
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Grid>
              )}

              {isVariableProduct && variations.length > 0 && (
                <Grid item xs={12}>
                  <Divider className="my-4" />
                  <Typography variant="h6" className="mb-4 font-semibold">
                    Product Variations
                  </Typography>
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    className="border rounded-lg">
                    <Table>
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
                            <TableCell>
                              {variation.options.join(" / ")}
                            </TableCell>
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
                                variant="outlined"
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
                                variant="outlined"
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
                                variant="outlined"
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
                <Box className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="file"
                    id="upload"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <label htmlFor="upload" className="cursor-pointer">
                    <Upload size={40} className="mx-auto mb-2 text-gray-400" />
                    <Typography variant="body1" className="font-semibold">
                      Upload Product Images
                    </Typography>
                  </label>
                </Box>
                <Box className="flex flex-wrap mt-4 gap-2">
                  {images.map((i, index) => (
                    <img
                      src={i}
                      key={index}
                      alt=""
                      className="h-20 w-20 object-cover rounded-md shadow-sm"
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  className="mt-6">
                  Create Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
