class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  def initialize(attributes = {})
    super()
    attributes.each do |key, value|
      send("#{key}=", value) if respond_to?("#{key}=")
    end
  end
end
