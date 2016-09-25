class PaintingsController < ApplicationController

  def today
    @today_painting = Painting.find(1)
      if request.xhr?
        render json: @today_painting
      end
  end


end
