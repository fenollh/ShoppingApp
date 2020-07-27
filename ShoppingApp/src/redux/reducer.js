import { store } from './state'
const reducer = (state=store.getState(), action) => {
    switch(action.type) {
        case 'GET_USER_DATA':
            return {
                ...state, 
                username: action.payload.username, 
                sessionID: action.payload.sessionID, 
                usermail: action.payload.usermail,
                profileName: action.payload.name,
                age: action.payload.age,
                profileImage: action.payload.image,
                stars: action.payload.stars,
                profileDescription: action.payload.description,
                favouriteShops: action.payload.favShopsList,
                shoppingList: action.payload.shoppingList,
            }
        case 'EDIT_USERNAME':
            return {...state, username: action.payload}
        case 'EDIT_USERMAIL':
            return {...state, usermail: action.payload}
        case 'EDIT_SESSION':
            return {...state, sessionID: action.payload}
        case 'EDIT_SELECTEDTAG':
            return {...state, selectedTag: action.payload}
        case 'EDIT_SELECTEDCATEGORIE':
            return {...state, selectedCategorie: action.payload}
        case 'ADD_ORDER':
            return {...state, myOrders: [...state.myOrders, action.payload]}
        case 'ADD_ITEM_SHOPPINGLIST':
            return {...state, shoppingList: {...state.shoppingList, items: [...state.shoppingList.items, action.payload]}}
        case 'REMOVE_ITEM_SHOPPINGLIST':
            state.shoppingList.items.splice(action.payload, 1) //the payload is the index
            return state 
        case 'REMOVE_ORDER':
            state.myOrders.splice(action.payload, 1) //the payload is the index
            return state 

        default:
            return state
    }
}
export {reducer}