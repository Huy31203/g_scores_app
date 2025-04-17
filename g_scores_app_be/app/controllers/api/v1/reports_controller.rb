class Api::V1::ReportsController < ApplicationController
  # GET /api/v1/reports/scores
  def scores
    report = Rails.cache.fetch("score_reports", expires_in: 1.hours) do
      Subject.distinct.pluck(:name).each_with_object({}) do |subject_name, result|
        result[subject_name] = ReportGenerator.new(subject_name).levels
      end
    end

    render_success(report, "Score distribution report")
  rescue StandardError => e
    # Log the error
    Rails.logger.error "Error generating score report: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")

    # Respond with an error message
    render_error("Failed to generate score distribution report", 500)
  end
end
