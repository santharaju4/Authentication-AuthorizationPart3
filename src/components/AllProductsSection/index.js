import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import ProductCard from '../ProductCard'
import './index.css'

class AllProductsSection extends Component {
  state = {
    productsList: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getRequestCall()
  }

  getRequestCall = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    console.log(response)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true) {
      const updateData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        id: product.id,
        price: product.price,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({productsList: updateData, isLoading: true})
    }
  }

  renderProductsList = () => {
    const {productsList} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products</h1>
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <>
        {isLoading ? (
          this.renderProductsList()
        ) : (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        )}
      </>
    )
  }
}

export default AllProductsSection
