Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
      resources :people, only: [:index, :show, :update, :create, :destroy]
      resources :addresses, only: [:index, :update, :create, :destroy]
      resources :emails, only: [:index, :update, :create, :destroy]
      resources :phones, only: [:index, :update, :create, :destroy]
    end
  end

  get '*path', to: "homes#index", via: :all
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
