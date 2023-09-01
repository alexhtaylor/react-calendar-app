Rails.application.routes.draw do
  resources :events, only: [:index, :create, :update, :destroy]
end
