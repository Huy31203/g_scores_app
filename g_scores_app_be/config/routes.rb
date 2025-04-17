Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # Student APIs
      resources :students, only: [ :show, :update ] do
        collection do
          get :top_ten         # GET  /api/v1/students/top_ten - Top 10 Group A
        end
      end

      # Report APIs
      namespace :reports do
        get :scores            # GET /api/v1/reports/scores - Score distribution
      end
    end
  end
end
