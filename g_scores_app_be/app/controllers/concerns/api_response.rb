# app/controllers/concerns/api_response.rb
module ApiResponse
  extend ActiveSupport::Concern

  def render_success(data = {}, message = "Success", status = :ok)
    render json: {
      status: "success",
      message: message,
      data: data
    }, status: status
  end

  def render_error(message = "Something went wrong", status = :unprocessable_entity, errors = nil)
    render json: {
      status: Rack::Utils::SYMBOL_TO_STATUS_CODE[status],
      message: message,
      errors: errors
    }, status: status
  end
end
