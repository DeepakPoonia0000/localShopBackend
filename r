
// const getShops = async (req, res) => {
//     try {
//         const role = req.role;
//         const { pincode } = req.query;

//         let shops;
//         if (pincode) {
//             console.log(pincode);
//             const pincodeInt = parseInt(pincode, 10);
//             const minPincode = pincodeInt - 10;
//             const maxPincode = pincodeInt + 10;

//             shops = await User.find(
//                 { 
//                     role: "R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y",
//                     pincode: { $gte: minPincode, $lte: maxPincode }
//                 },
//                 'shopName address pincode'
//             );
//         } else {
//             shops = await User.find(
//                 { role: "R@7yU5vK*9#L^eP&1!sF8$2B0oQmWzD4xJ%pC3gN#6T$Y" },
//                 'shopName address pincode'
//             );
//         }

//         if (shops.length === 0) {
//             return res.status(404).json({ error: 'No shops found' });
//         }

//         res.status(200).json([shops, role]);
//     } catch (error) {
//         console.error('Failed to get shops:', error);
//         res.status(500).json({ error: error.message });
//     }
// };