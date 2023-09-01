class CalendarsController < ApplicationController
  before_action :set_calendar, only: [:show, :update, :destroy]

  def index
    @calendars = Calendar.all
    render json: @calendars
  end

  def show
    render json: @calendar
  end

  def create
    @calendar = Calendar.new(calendar_params)

    if @calendar.save
      render json: @calendar, status: :created
    else
      render json: @calendar.errors, status: :unprocessable_entity
    end
  end

  def update
    if @calendar.update(calendar_params)
      render json: @calendar
    else
      render json: @calendar.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @calendar.destroy
  end

  def share
    @calendar = Calendar.find(params[:id])
    render json: { shareable_link: @calendar.shareable_link }
  end

  private

  def set_calendar
    @calendar = Calendar.find(params[:id])
  end

  def calendar_params
    params.require(:calendar).permit(:title, :description)
  end
end
