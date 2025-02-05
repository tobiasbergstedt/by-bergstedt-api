import type { Schema, Attribute } from '@strapi/strapi';

export interface ApiUserData extends Schema.Component {
  collectionName: 'components_api_user_data';
  info: {
    displayName: 'userData';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    company: Attribute.String;
    address: Attribute.String;
    email: Attribute.String;
    phoneNumber: Attribute.String;
    message: Attribute.String;
  };
}

export interface ApiShoppingCartItem extends Schema.Component {
  collectionName: 'components_api_shopping_cart_items';
  info: {
    displayName: 'shoppingCartItem';
    description: '';
  };
  attributes: {
    amount: Attribute.Integer;
    image: Attribute.String;
    name: Attribute.Component<'api.name'>;
    price: Attribute.Integer;
    productId: Attribute.String;
    weight: Attribute.Integer;
  };
}

export interface ApiName extends Schema.Component {
  collectionName: 'components_api_names';
  info: {
    displayName: 'name';
  };
  attributes: {
    sv: Attribute.String;
    en: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'api.user-data': ApiUserData;
      'api.shopping-cart-item': ApiShoppingCartItem;
      'api.name': ApiName;
    }
  }
}
