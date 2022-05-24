module Api
  module V1
    class PhonesController < ApplicationController
      def index
        phones = Phone.all
        render json: phones
      end

      def show
        phone = current_user.people.find(params[:id]).phones
        render json: phone
      end

      def create
        phone = current_user.people.find(params[:id]).phones.new(phone_params)

        if phone.save
          render json: current_user.people.new(phone)
        else
          render json: {error: phone.errors.mesages}, status:422
        end
      end

      def update
        phone = current_user.people.find(params[:id]).phones

        if phone.update(address_params)
          render json: current_user.people.new(phone)
        else
          render json: {error: phone.errors.mesages}, status:422
        end
      end

      def destroy
        phone = current_user.people.find(params[:id]).phones

        if phone.destroy
          head :no_content
        else
          render json: {error: phone.errors.mesages}, status:422
        end
      end

      private
      # Use callbacks to share common setup or constraints between actions.
      def set_person
        @phone = current_user.people.find(params[:id]).phones
      end

      def person_params
        params.require(:phone).permit(:phone_number, :comment)
      end
    end
  end
end


