import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center my-3">
        <div class="spinner-border" role="status">
  <span class="visually-hidden ">Loading...</span>
</div>
      </div>
    )
  }
}
