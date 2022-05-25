module Api
  module V1
    class AddressesController < ApplicationController
      def index
        addresses = Address.all
        render json: addresses
      end

      def show
        address = current_user.people.find(params[:id]).addresses
        render json: address
      end

      def create
        address = current_user.people.find(params[:id]).addresses.new(address_params)

        if address.save
          render json: current_user.people.new(address)
        else
          render json: {error: address.errors.mesages}, status:422
        end
      end

      def destroy
        address = current_user.people.find(params[:id]).addresses

        if address.destroy
          head :no_content
        else
          render json: {error: address.errors.mesages}, status:422
        end
      end

      def update
        address = current_user.people.find(params[:id]).addresses

        if address.update(address_params)
          render json: current_user.people.new(address)
        else
          render json: {error: address.errors.mesages}, status:422
        end
      end


      private
      # Use callbacks to share common setup or constraints between actions.
      def set_person
        @address = current_user.people.find(params[:id]).addresses
      end

      def person_params
        params.require(:address).permit(:street, :town, :zip_code, :state, :country)
      end

    end
  end
end


