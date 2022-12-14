/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable quote-props */
/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable padded-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-spacing */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable arrow-spacing */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable semi */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const dayjs = require('dayjs');
const { CarAlreadyRentedError } = require('../errors');
const { Car } = require('../models');
const CarController = require('./CarController');

describe('CarController', ()=>{
  describe("#handleGetCar", () => {
    it("should call res.status(200) and res.json with car data", async () => {
      const name = "Avanza";
      const price = 42000;
      const size = "medium";
      const image = "avanza.png";
      const isCurrentlyRented = false;

      const mockRequest = {
        params: {
          id: 1,
        }
      };

      const mockCar = new Car({ name, price, size, image, isCurrentlyRented });
      const mockCarModel = {
        findByPk: jest.fn().mockReturnValue(mockCar),
      }

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const carController = new CarController({ carModel: mockCarModel });

      await carController.handleGetCar(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
    });
  });

  describe("#handleCreateCar", () =>{
    it("should call res.status(201) and res.json with task instance", async () => {
        const name = "Avanza";
        const prize = 10000;  
        const size = "Large";  
        const image = "avanza.jpg";  
  
        const mockRequest = {
          body: {
            name,
            prize,
            size,
            image,
          },
        };
  
        const car = new Car({ name, prize , size , image });
        const mockCarModel = { create: jest.fn().mockReturnValue(car) };
  
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
  
        const carController = new CarController({ carModel: mockCarModel });
  
        await carController.handleCreateCar(mockRequest, mockResponse);
  
        expect(mockCarModel.create).toHaveBeenCalled();
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith(car);
      });
  
      it("should call res.status(422) and res.json with task instance", async () => {
        const err = new Error("Something");
        const name = "Avanza";
        const price = 10000;  
        const size = "Large";  
        const image = "avanza.jpg"; 
        const isCurrentlyRented = false;
  
        const mockRequest = {
          body: {
            name,
            price,
            size,
            image,
            isCurrentlyRented,
          },
        };
  
        const mockCarModel = {
          create: jest.fn().mockReturnValue(Promise.reject(err)),
        };
  
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
  
        const carController = new CarController({ carModel: mockCarModel });
  
        await carController.handleCreateCar(mockRequest, mockResponse);
  
        expect(mockCarModel.create).toHaveBeenCalledWith({
            name,
            price,
            size,
            image,
            isCurrentlyRented,
        });
        expect(mockResponse.status).toHaveBeenCalledWith(422);
        expect(mockResponse.json).toHaveBeenCalledWith({
          error: {
            name: err.name,
            message: err.message,
          },
        });
      });
  })
  describe("#handleUpdateCar", () => {
    it("should call res.status(201) and res.json with car data", async () => {
      const name = "toyota";
      const price = 12000;
      const size = "medium";
      const image = "test.png";
      const isCurrentlyRented = false;

      const mockrequest = {
        params: {
          id: 1,
        },
        body: {
          name,
          price,
          size,
          image,
          isCurrentlyRented
        },
      };

      const mockCar = new Car({ name, price, size, image, isCurrentlyRented });
      mockCar.update = jest.fn().mockReturnThis();

      const mockCarModel = {
        findByPk: jest.fn().mockReturnValue(mockCar)
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const carController = new CarController({ carModel: mockCarModel });
      await carController.handleUpdateCar(mockrequest, mockResponse);

      expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
      expect(mockCar.update).toHaveBeenCalledWith({ name, price, size, image, isCurrentlyRented });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCar);
    });

  });

  describe("#handleDeleteCar", () =>{
      it("should call res.status(204)", async () => {
          const name = "Avanza";
          const prize = 10000;  
          const size = "Large";  
          const image = "avanza.jpg";  
    
          const mockRequest = {
              params: {
                id: 1,
              },
            };
      
          const mockCar = new Car({ name, prize,size,image });
          mockCar.destroy = jest.fn();

          const mockCarModel = {};
          mockCarModel.findByPk = jest.fn().mockReturnValue(mockCar);  
    
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              end: jest.fn().mockReturnThis(),
            };
    
          const carController = new CarController({ carModel: mockCarModel });
          await carController.handleDeleteCar(mockRequest, mockResponse);
    
          expect(mockCarModel.findByPk).toHaveBeenCalledWith(1);
          expect(mockCar.destroy).toHaveBeenCalledWith();
          expect(mockResponse.status).toHaveBeenCalledWith(204);
          expect(mockResponse.end).toHaveBeenCalled();

      });

      it("should call res.status(404)", async () => {
        const err = new Error("Not found!");
       
        const mockCarModel = {};
        mockCarModel.findByPk = jest.fn().mockReturnValue(err);  
  
        const mockResponse = {
          status: jest.fn().mockReturnThis(),
          end: jest.fn().mockReturnThis(),
        };
  
        const carController = new CarController({ carModel: mockCarModel });
        await carController.handleDeleteCar(err, mockResponse);
  
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.end).toHaveBeenCalledWith();
    });
  })

  describe("#getCarFromRequest", () => {
    it("should return car", () => {
      const mockRequest = {
        params: {
          id: 1,
        }
      };

      const mockCar = 1;

      const mockCarModel = {
        findByPk: jest.fn().mockReturnValue(mockCar),
      }

      const carController = new CarController({ carModel: mockCarModel });
      const car = carController.getCarFromRequest(mockRequest);

      expect(car).toEqual(1);
    })
  });

  describe("#handleRentCar", () => {
    it("should return res.status(201) and res.json with user car instance", async () => {
      const rentStartedAt = new Date().toISOString();
      const rentEndedAt = dayjs(rentStartedAt).add(1, "day");

      const mockRequest = {
        body: {
          rentStartedAt,
          rentEndedAt: null,
        },
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockNext = jest.fn();

      const mockCar = {
        'id': 1,
        'name': 'toyota',
        'price': 12000,
        'size': 'medium',
        'image': 'https://pictures.com/picture.png',
        'isCurrentlyRented': false,
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
        'userCar': null,
      };

      const mockCarModel = {
        findByPk: jest.fn().mockReturnValue(mockCar)
      };

      const mockUserCar = {
        id: 1,
        userId: 1,
        carId: 1,
        rentStartedAt: null,
        rentEndedAt: null,
        createdAt: null,
        updatedAt: null,
      }

      const mockUserCarModel = {
        findOne: jest.fn().mockReturnValue(null),
        create: jest.fn().mockReturnValue({
          ...mockUserCar,
          rentStartedAt,
          rentEndedAt,
        }),
      };

      const carController = new CarController({
        carModel: mockCarModel,
        userCarModel: mockUserCarModel,
        dayjs,
      });
      await carController.handleRentCar(mockRequest, mockResponse, mockNext);

      expect(mockUserCarModel.create).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        ...mockUserCar,
        rentStartedAt,
        rentEndedAt,
      });
    });

    it("should call next", async () => {
      const rentStartedAt = new Date().toISOString();

      const mockRequest = {
        body: {
          rentStartedAt,
          rentEndedAt: null,
        },
        params: {
          id: 1,
        },
        user: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockNext = jest.fn();

      const mockCarModel = {
        findByPk: jest.fn().mockRejectedValue(new Error()),
      };

      mockUserCarModel = {};

      const carController = new CarController({
        carModel: mockCarModel,
        userCarModel: mockUserCarModel,
        dayjs,
      });

      await carController.handleRentCar(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalled();
    })
  });

  describe("#handleListCars", () => {
    it("should res.status(200) and res.json with cars list data", async () => {
      const mockRequest = {
        query: {},
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const mockCarLists = [];

      const mockCar = {
        'id': 1,
        'name': 'toyota',
        'price': 12000,
        'size': 'medium',
        'image': 'https://pictures.com/picture.png',
        'isCurrentlyRented': false,
        'createdAt': '2022-11-17T05:11:01.429Z',
        'updatedAt': '2022-11-17T05:11:01.429Z',
        'userCar': null,
      };

      for (let i = 0; i < 10; i++) {
        mockCarLists.push({
          ...mockCar,
          id: i + 1,
        });
      }

      const mockCarModel = {
        findAll: jest.fn().mockReturnValue(mockCarLists),
        count: jest.fn().mockReturnValue(10),
      };

      const carController = new CarController({
        carModel: mockCarModel,
        userCarModel: {},
        dayjs
      });
      await carController.handleListCars(mockRequest, mockResponse);

      const expectedPagination = carController.buildPaginationObject(mockRequest, 10);

      expect(mockCarModel.findAll).toHaveBeenCalled();
      expect(mockCarModel.count).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        cars: mockCarLists,
        meta: {
          pagination: expectedPagination,
        },
      });
    });
  });

  describe("#getCarFromRequest", () => {
    it("should return car", () => {
      const mockRequest = {
        params: {
          id: 1,
        }
      };

      const mockCar = 1;

      const mockCarModel = {
        findByPk: jest.fn().mockReturnValue(mockCar),
      }

      const carController = new CarController({ carModel: mockCarModel });
      const car = carController.getCarFromRequest(mockRequest);

      expect(car).toEqual(1);
    })
  });

})